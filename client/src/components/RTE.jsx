import React from "react";

// tiny mce
import { Editor } from "@tinymce/tinymce-react";

// react-hook-form
import { Controller } from "react-hook-form";

function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mb-1 text-lg font-medium text-gray-700">
          {label}
        </label>
      )}

      {/* Controller gives us control of whatever is inside it as we will use editor in form */}
      <Controller
        name={name || "Content"}
        control={control}
        render={({ field: { onChange } }) => (
          // Editor :

          <Editor
            initialValue={defaultValue}
            init={{
              initialValue: defaultValue,
              height: 400,
              menubar: true,
              plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
              ],
              toolbar:
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}

export default RTE;
