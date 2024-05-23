import { useState } from "react";
import { toast } from "react-toastify";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useRemoveCategoryMutation,
  useFetchCategoriesQuery,
} from "../../redux/api/categoryApiSlice.js";
import CategoryForm from "../../components/CategoryForm.jsx";
import Modal from "../../components/Modal.jsx";
import AdminMenu from "./AdminMenu.jsx";

const CategoryList = () => {
  const { data: categories } = useFetchCategoriesQuery();
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [removeCategory] = useRemoveCategoryMutation();

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    try {
      const result = await createCategory({ name }).unwrap();
      if (result.error) {
        toast.error(result.error);
        return;
      } else {
        setName("");
        toast.success(`${result.name} is successfully created`);
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    try {
      if (!updatingName) {
        toast.error("Category name is required");
        return;
      }
      const result = await updateCategory({
        categoryId: selectedCategory._id,
        updatedCategory: { name: updatingName },
      }).unwrap();
      if (result.error) {
        toast.error(result.error);
        return;
      } else {
        setModalVisible(false);
        toast.success(`${result.name} is successfully updated`);
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleDeleteCategory = async () => {
    try {
      const result = await removeCategory(selectedCategory._id).unwrap();
      if (result.error) {
        toast.error(result.error);
        return;
      } else {
        setModalVisible(false);
        toast.success(`${result.name} is successfully deleted`);
        selectedCategory = null;
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="ml-[10%] flex flex-col md:flex-row">
      <AdminMenu />
      <div className="w-[90%] p-3 mt-[3rem]">
        <h2 className="text-2xl h-12 font-semibold">Manage Categories</h2>
        <CategoryForm
          value={name}
          setValue={setName}
          handleSubmit={handleCreateCategory}
        />
        <br />
        <hr />

        <div className="flex flex-wrap">
          {categories?.map((category) => (
            <div key={category._id}>
              <button
                className=" border border-pink-500 text-pink-500 py-2 px-4 rounded-lg m-3 hover:bg-pink-500 hover:text-white focus:outline-none foucs:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                onClick={() => {
                  {
                    setModalVisible(true);
                    setSelectedCategory(category);
                    setUpdatingName(category.name);
                  }
                }}
              >
                {category.name}
              </button>
            </div>
          ))}
        </div>
        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
          <CategoryForm
            value={updatingName}
            setValue={(value) => setUpdatingName(value)}
            handleSubmit={handleUpdateCategory}
            buttonText="Update"
            handleDelete={handleDeleteCategory}
          />
        </Modal>
      </div>
    </div>
  );
};

export default CategoryList;
