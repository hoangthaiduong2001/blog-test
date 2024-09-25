import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { mutate } from "swr";
import { IPropsUpdateModal } from "./type";

export const UpdateModal = (props: IPropsUpdateModal) => {
  const { showModal, setShowModal, value } = props;
  const [id, setId] = useState<number>(0);
  const [title, setTitle] = useState<string>(value?.title || "");
  const [author, setAuthor] = useState<string>(value?.author || "");
  const [content, setContent] = useState<string>(value?.content || "");

  useEffect(() => {
    if (value && value.id) {
      setId(value.id);
      setTitle(value.title);
      setAuthor(value.author);
      setContent(value.content);
    }
  }, [value]);

  const handleClose = () => {
    setShowModal(false);
  };
  const handleSubmit = () => {
    if (title === "") {
      toast.warning("Please check title");
      return;
    }
    if (author === "") {
      toast.warning("Please check author");
      return;
    }
    if (content === "") {
      toast.warning("Please check content");
      return;
    }
    fetch(`${import.meta.env.VITE_SERVER}/blogs/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, author, content }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          toast.success("success");
          handleClose();
          mutate("${import.meta.env.VITE_SERVER}/blogs");
          console.log(res);
        } else {
          toast.error("error");
        }
      });
  };

  return (
    <>
      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Update Blogs</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                placeholder="..."
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
