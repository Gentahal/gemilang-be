import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto.js';
import { UpdateProjectDto } from './dto/update-project.dto.js';
import { Project, ProjectStatus } from './entities/project.entity.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { Project as PrismaProject, ProjectStatus as PrismaProjectStatus } from '@prisma/client';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  private mapToPrismaStatus(status?: ProjectStatus | string | null): PrismaProjectStatus | undefined {
    if (!status) return undefined;
    switch (status) {
      case ProjectStatus.PLANNING:
      case 'PLANNING':
        return PrismaProjectStatus.PLANNING;
      case ProjectStatus.IN_PROGRESS:
      case 'IN_PROGRESS':
        return PrismaProjectStatus.IN_PROGRESS;
      case ProjectStatus.ON_HOLD:
      case 'ON_HOLD':
        return PrismaProjectStatus.ON_HOLD;
      case ProjectStatus.COMPLETED:
      case 'COMPLETED':
        return PrismaProjectStatus.COMPLETED;
      default:
        return undefined;
    }
  }

  private mapToDomainStatus(status: PrismaProjectStatus | string): ProjectStatus {
    switch (status) {
      case PrismaProjectStatus.PLANNING:
      case 'Planning':
        return ProjectStatus.PLANNING;
      case PrismaProjectStatus.IN_PROGRESS:
      case 'In Progress':
        return ProjectStatus.IN_PROGRESS;
      case PrismaProjectStatus.ON_HOLD:
      case 'On Hold':
        return ProjectStatus.ON_HOLD;
      case PrismaProjectStatus.COMPLETED:
      case 'Completed':
        return ProjectStatus.COMPLETED;
      default:
        return status as ProjectStatus;
    }
  }

  private formatProject(project: PrismaProject): Project {
    return {
      id: project.id,
      name: project.name,
      description: project.description,
      status: this.mapToDomainStatus(project.status),
      deadline: project.deadline,
      ownerId: project.ownerId,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    };
  }

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    // Skenario Error 1: ConflictException jika nama project duplikat
    const isDuplicate = await this.prisma.project.findUnique({
      where: { name: createProjectDto.name },
    });
    if (isDuplicate) {
      throw new ConflictException(`Project dengan nama "${createProjectDto.name}" sudah ada.`);
    }

    const prismaStatus = this.mapToPrismaStatus(createProjectDto.status) ?? PrismaProjectStatus.PLANNING;

    const created = await this.prisma.project.create({
      data: {
        name: createProjectDto.name,
        description: createProjectDto.description || '',
        status: prismaStatus,
        deadline: createProjectDto.deadline ? new Date(createProjectDto.deadline) : null,
        ownerId: createProjectDto.ownerId,
      },
    });

    return this.formatProject(created);
  }

  async findAll(status?: ProjectStatus): Promise<Project[]> {
    const prismaStatus = this.mapToPrismaStatus(status);
    const projects = await this.prisma.project.findMany({
      where: prismaStatus ? { status: prismaStatus } : undefined,
      orderBy: { createdAt: 'desc' },
    });

    return projects.map((p) => this.formatProject(p));
  }

  async findOne(id: string): Promise<Project> {
    const project = await this.prisma.project.findUnique({
      where: { id },
    });
    // Skenario Error 2: NotFoundException jika project tidak ditemukan
    if (!project) {
      throw new NotFoundException(`Project dengan ID ${id} tidak ditemukan.`);
    }
    return this.formatProject(project);
  }

  async update(id: string, updateProjectDto: UpdateProjectDto): Promise<Project> {
    // Pastikan project ada terlebih dahulu
    await this.findOne(id);

    // Cek duplikasi jika nama project diubah
    if (updateProjectDto.name) {
      const duplicate = await this.prisma.project.findFirst({
        where: {
          name: updateProjectDto.name,
          NOT: { id },
        },
      });
      if (duplicate) {
        throw new ConflictException(`Project dengan nama "${updateProjectDto.name}" sudah ada.`);
      }
    }

    const prismaStatus = this.mapToPrismaStatus(updateProjectDto.status);

    const updated = await this.prisma.project.update({
      where: { id },
      data: {
        name: updateProjectDto.name,
        description: updateProjectDto.description,
        status: prismaStatus,
        deadline:
          updateProjectDto.deadline !== undefined
            ? updateProjectDto.deadline
              ? new Date(updateProjectDto.deadline)
              : null
            : undefined,
        ownerId: updateProjectDto.ownerId,
      },
    });

    return this.formatProject(updated);
  }

  async remove(id: string): Promise<Project> {
    const project = await this.prisma.project.findUnique({
      where: { id },
    });
    if (!project) {
      throw new NotFoundException(`Project dengan ID ${id} tidak ditemukan untuk dihapus.`);
    }

    const deleted = await this.prisma.project.delete({
      where: { id },
    });

    return this.formatProject(deleted);
  }

  // Nilai tambah: Query statistik agregasi (count & group by)
  async getStats() {
    const totalProjects = await this.prisma.project.count();
    const byStatus = await this.prisma.project.groupBy({
      by: ['status'],
      _count: {
        _all: true,
      },
    });

    return {
      totalProjects,
      byStatus: byStatus.map((item) => ({
        status: this.mapToDomainStatus(item.status),
        count: item._count._all,
      })),
    };
  }
}
