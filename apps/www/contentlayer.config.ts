import {
  defineDocumentType,
  defineNestedType,
  makeSource,
} from "contentlayer2/source-files"

const Author = defineNestedType(() => ({
  name: "Author",
  fields: {
    name: { type: "string", required: true },
    avatar: { type: "string", required: true },
    x: { type: "string", required: false },
    linkedin: { type: "string", required: false },
  },
}))

const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `posts/**/*.mdx`,
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
    author: { type: "nested", required: true, of: Author },
    tags: { type: "list", required: true, of: { type: "string" } },
    status: { type: "enum", options: ["draft", "published"], default: "draft" },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (post) => `/posts/${post._raw.flattenedPath}`,
    },
  },
}))

export default makeSource({
  contentDirPath: "src/content/posts",
  documentTypes: [Post],
})
