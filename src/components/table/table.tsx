import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { CreateModal } from "../modal/create.modal";
import { ModalDelete } from "../modal/delete.modal";
import { UpdateModal } from "../modal/update.modal";
import { IBlog, IPropsTable } from "./type";

export const TableBlog = (props: IPropsTable) => {
  const [showModalCreate, setShowModalCreate] = useState<boolean>(false);
  const [showModalUpdate, setShowModalUpdate] = useState<boolean>(false);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [idBlogs, setIdBlogs] = useState<number>(0);
  const [value, setValue] = useState<IBlog>();
  const handleUpdate = (item: IBlog) => {
    setShowModalUpdate(true);
    setValue(item);
  };
  const handleDelete = (id: number) => {
    setShowModalDelete(true);
    setIdBlogs(id);
  };
  return (
    <div className="px-20">
      <div className="m-4 flex justify-between">
        <h1 className="font-bold text-3xl">Blogs List</h1>
        <Button variant="secondary" onClick={() => setShowModalCreate(true)}>
          Add new blogs
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Title</th>
            <th>Author</th>
            <th className="flex justify-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {props.blogs?.map((item) => (
            <tr key={item.id}>
              <td className="">{item.id}</td>
              <td>{item.title}</td>
              <td>{item.author}</td>
              <td className="flex justify-center">
                <Button>
                  <NavLink
                    className="btn-danger text-white"
                    to={`/blogs/${item?.id}`}
                  >
                    View
                  </NavLink>
                </Button>
                <Button
                  variant="success"
                  className="mx-3"
                  onClick={() => handleUpdate(item)}
                >
                  Update
                </Button>
                <Button variant="danger" onClick={() => handleDelete(item.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <CreateModal
        showModal={showModalCreate}
        setShowModal={setShowModalCreate}
      />
      <UpdateModal
        value={value}
        showModal={showModalUpdate}
        setShowModal={setShowModalUpdate}
      />
      <ModalDelete
        idBlogs={idBlogs}
        showModal={showModalDelete}
        setShowModal={setShowModalDelete}
      />
    </div>
  );
};
