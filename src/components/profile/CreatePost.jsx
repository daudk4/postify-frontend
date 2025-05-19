import { ErrorMessage, Field, Form, Formik } from "formik";
import { validate_post_form } from "@/schema";

const initialValues = {
  content: "",
};
const CreatePost = () => {
  async function handleSubmit(values, { setSubmitting }) {}
  return (
    <div className="bg-zinc-800 rounded-xl p-4 shadow-lg border border-zinc-700 mb-6 animate-in">
      <h3 className="font-medium mb-4">Create a new post</h3>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validate_post_form}
      >
        {({ touched, errors, isSubmitting }) => (
          <Form noValidate>
            <div className="bg-zinc-700 rounded-xl p-1 mb-1">
              <Field
                as="textarea"
                id="content"
                name="content"
                placeholder="What's on your mind?"
                className="w-full p-3 outline-none resize-none bg-transparent rounded-lg text-sm min-h-[100px]"
              />{" "}
              <div className="flex items-center justify-between px-3 py-2 border-t border-zinc-600">
                <div className="flex space-x-2">
                  {["image", "video", "smile"].map((icon) => (
                    <button
                      key={icon}
                      type="button"
                      className="text-zinc-400 hover:text-blue-500 transition-colors"
                    >
                      <i className={`fas fa-${icon}`} />
                    </button>
                  ))}
                </div>
                <button
                  className={`px-4 py-1.5 bg-blue-500 hover:bg-blue-600 rounded-full text-sm font-medium transition-colors flex items-center space-x-1 ${
                    isSubmitting
                      ? "bg-blue-600 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
                  type="submit"
                  disabled={isSubmitting}
                >
                  <span>{isSubmitting ? "Posting" : "Post"}</span>
                  <i className="fas fa-paper-plane text-xs"></i>
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreatePost;
