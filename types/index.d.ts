
export interface UpdateData {
  title: string, 
  publishedAt: string | Date
}

export interface Update {
  content: string,
  data: UpdateData,
  filePath: string;
}

