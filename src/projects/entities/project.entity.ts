export enum ProjectStatus {
  PLANNING = 'Planning',
  IN_PROGRESS = 'In Progress',
  ON_HOLD = 'On Hold',
  COMPLETED = 'Completed',
}

export class Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  deadline: Date | null;
  ownerId: string;
  createdAt?: Date;
  updatedAt?: Date;
}
