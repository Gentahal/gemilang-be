import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto.js';
import { UpdateProjectDto } from './dto/update-project.dto.js';
import { Project, ProjectStatus } from './entities/project.entity.js';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProjectsService {
  private projects: Project[] = [];

  create(createProjectDto: CreateProjectDto) {
    // Skenario Error 1: ConflictException jika nama project duplikat
    const isDuplicate = this.projects.some(p => p.name === createProjectDto.name);
    if (isDuplicate) {
      throw new ConflictException(`Project dengan nama "${createProjectDto.name}" sudah ada.`);
    }

    const newProject: Project = {
      id: uuidv4(),
      name: createProjectDto.name,
      description: createProjectDto.description || '',
      status: createProjectDto.status || ProjectStatus.PLANNING,
      deadline: createProjectDto.deadline ? new Date(createProjectDto.deadline) : null,
      ownerId: createProjectDto.ownerId,
    };
    
    this.projects.push(newProject);
    return newProject;
  }

  findAll() {
    return this.projects;
  }

  findOne(id: string) {
    const project = this.projects.find((p) => p.id === id);
    // Skenario Error 2: NotFoundException jika project tidak ditemukan
    if (!project) {
      throw new NotFoundException(`Project dengan ID ${id} tidak ditemukan.`);
    }
    return project;
  }

  update(id: string, updateProjectDto: UpdateProjectDto) {
    const projectIndex = this.projects.findIndex((p) => p.id === id);
    if (projectIndex === -1) {
      throw new NotFoundException(`Project dengan ID ${id} tidak ditemukan.`);
    }

    this.projects[projectIndex] = {
      ...this.projects[projectIndex],
      ...updateProjectDto,
      deadline: updateProjectDto.deadline ? new Date(updateProjectDto.deadline) : this.projects[projectIndex].deadline,
    };

    return this.projects[projectIndex];
  }

  remove(id: string) {
    const projectIndex = this.projects.findIndex((p) => p.id === id);
    if (projectIndex === -1) {
      throw new NotFoundException(`Project dengan ID ${id} tidak ditemukan untuk dihapus.`);
    }
    const removedProject = this.projects.splice(projectIndex, 1);
    return removedProject[0];
  }
}