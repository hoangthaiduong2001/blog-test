import { IBlog } from "../table/type";

export interface IPropsCreateModal {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}

export interface IPropsDeleteModal {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  idBlogs: number;
}

export interface IPropsUpdateModal {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  value?: IBlog;
}
