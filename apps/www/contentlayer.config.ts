import { defineDocumentType, makeSource } from "contentlayer2/source-files"

const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "The title of the post",
      required: true,
    },
    date: {
      type: "date",
      description: "The date of the post",
      required: true,
    },
    imageSrc: {
      type: "string",
      description: "The source of the image for the post",
      required: true,
    },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => `/posts/${doc._raw.flattenedPath}`,
    },
  },
}))

export default makeSource({
  contentDirPath: "src/content/posts",
  documentTypes: [Post],
})
