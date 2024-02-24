export interface userListModel {
  id: number;
  profile?: string;
  name: string;
  position: string;
  email: string;
  tags: Array<{}>;
  project: string;
  isSelected?:any;
}
  