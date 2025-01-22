import React, { useCallback, useEffect } from "react";

// react-hook-form
import { useForm } from "react-hook-form";

// components
import { Button, RTE, Input, Select } from "../";

// appwrite
import dbService from "../../appwrite/dbService.js";
import storageHandler from "../../appwrite/storageService.js";

// routes
import { useNavigate } from "react-router-dom";

// state management
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  const { watch, register, handleSubmit, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    if (!userData?.$id) {
      console.log("User is not authenticated. Cannot create post");
      return alert("Please log in to create a post");
    }

    try {
      if (post) {
        // For updating an existing post
        const file = data.image[0]
          ? await storageHandler.uploadFile(data.image[0])
          : null;

        if (file) {
          storageHandler.deleteFile(post.featuredImage);
        }

        const dbPost = await dbService.updatePost(post.$id, {
          ...data,
          featuredImage: file ? file.$id : undefined,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      } else {
        // For creating a new post
        const file = data.image[0]
          ? await storageHandler.uploadFile(data.image[0])
          : null;

        const newPostData = {
          ...data,
          featuredImage: file ? file.$id : undefined,
          userId: userData?.$id, // Use userData from Redux
        };

        const dbPost = await dbService.createPost(newPostData);

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  const slugTransform = useCallback(
    (value) => value?.trim().toLowerCase().replace(/ /g, "-") || "",
    []
  );

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap gap-4">
      {/* Left part */}

      <div className="w-full md:w-2/3 space-y-6">
        <Input
          label="Title :"
          placeholder="Enter the post title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Generated automatically or write yourselves"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>

      {/* Right part */}

      <div className="w-full md:w-1/3 space-y-6">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={storageHandler.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg w-full h-auto shadow-md"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full font-semibold"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}
