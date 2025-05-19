import * as Yup from "yup";

export const validate_post_form = Yup.object({
  content: Yup.string().required("content is required"),
});
