import React, { useState } from "react";

interface CreatePostFormProps {
  onSubmit: (title: string, content: string) => void;
  onCancel: () => void;
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({
  onSubmit,
  onCancel,
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(title, content);
    setTitle("");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-200 p-4 rounded-lg mb-4">
      <h3 className="text-lg font-bold mb-2">Create New Post</h3>
      <div className="mb-2">
        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-2">
        <textarea
          placeholder="Content..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border rounded"
          rows={3}
          required
        />
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="mr-2 px-4 py-2 bg-red-500 text-white rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default CreatePostForm;