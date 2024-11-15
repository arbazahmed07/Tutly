import { zodResolver } from "@hookform/resolvers/zod";
import MDEditor from "@uiw/react-md-editor";
import axios from "axios";
import katex from "katex";
import "katex/dist/katex.css";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaFilePen } from "react-icons/fa6";
import { getCodeString } from "rehype-rewrite";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "@/hooks/use-router";
import { actions } from "astro:actions";
import { attachmentType, submissionMode } from "@prisma/client";

const formSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: "Title is required",
    })
    .refine((value) => !/\s/.test(value), {
      message: "Title cannot contain spaces",
    }),
  link: z.string().optional(),
  attachmentType: z.string().min(1, {
    message: "Type is required",
  }),
  class: z.string().min(1, {
    message: "class is required",
  }),
  submissionMode: z.string().min(1, {
    message: "Submission mode is required",
  }),
  courseId: z.string().optional(),
  details: z.string().optional(),
  dueDate: z.string().optional(),
  maxSubmissions: z
    .string()
    .transform((v) => Number(v) || 0)
    .optional(),
});

const NewAttachmentPage = ({ classes }: { classes: any }) => {
  const searchParams = new URLSearchParams(window.location.search);
  const courseId = searchParams.get("courseId");
  const classId = searchParams.get("classId");
//   const [classes, setClasses] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await axios.get(`/api/classes/getClassesById/${courseId}`);
//       setClasses(response.data);
//       setLoading(false);
//     };
//     fetchData();
//   }, [courseId]);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      link: "",
      attachmentType: "",
      submissionMode: "",
      class: "",
      courseId: "",
      details: "",
      dueDate: "",
      maxSubmissions: 0,
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const dueDate =
      values?.dueDate !== "" && values?.dueDate ? new Date(values?.dueDate) : undefined;

    values.title = values.title.trim();

    const res = await actions.attachments_createAttachment({
      title: values.title,
      classId: values.class,
      link: values.link,
      attachmentType: values.attachmentType as attachmentType,
      submissionMode: values.submissionMode as submissionMode,
      details: values.details,
      dueDate: dueDate || undefined,
      maxSubmissions: values?.maxSubmissions,
      courseId: courseId!,
    });

    if (!res) {
      toast.error("An error occurred");
      return;
    }
    toast.success("attachment created");
    router.push(`/courses/${courseId}/class/${classId}`);
  };
  return (
    <div className="h-full w-full p-4 md:p-7">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 flex items-center text-xl font-semibold md:text-2xl">
          Create a new attachment
          <FaFilePen className="ml-4 h-5 w-5" />
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                name="title"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base" htmlFor="title">
                      Title
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="text-base"
                        disabled={isSubmitting}
                        placeholder="eg., React Forms"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="select-none text-sm opacity-90 hover:opacity-100">
                      No spaces are allowed (use underscores)
                    </FormDescription>
                    <FormMessage className="font-bold text-red-700" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="attachmentType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Attachment type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue className="text-base" placeholder="Select a type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-secondary-700 bg-background text-base text-white">
                        <SelectItem className="text-base hover:bg-secondary-800" value="ASSIGNMENT">
                          Assignment
                        </SelectItem>
                        <SelectItem className="text-base hover:bg-secondary-800" value="ZOOM">
                          Zoom
                        </SelectItem>
                        <SelectItem className="text-base hover:bg-secondary-800" value="GITHUB">
                          Github
                        </SelectItem>
                        <SelectItem className="textbas hover:bg-secondary-800" value="OTHERS">
                          Other
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="font-bold text-red-700" />
                  </FormItem>
                )}
              />
              <FormField
                name="maxSubmissions"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Max Submissions</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className="text-base"
                        min="0"
                        disabled={isSubmitting}
                        placeholder="eg., max Submissions..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="font-bold text-red-700" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="submissionMode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Submission Mode</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue className="text-base" placeholder="Select a type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-background text-white">
                        <SelectItem
                          className="text-base hover:bg-secondary-800"
                          value="HTML_CSS_JS"
                        >
                          HTML_CSS_JS
                        </SelectItem>
                        <SelectItem className="text-base hover:bg-secondary-800" value="REACT">
                          REACT
                        </SelectItem>
                        <SelectItem
                          className="text-base hover:bg-secondary-800"
                          value="EXTERNAL_LINK"
                        >
                          EXTERNAL_LINK
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="font-bold text-red-700" />
                  </FormItem>
                )}
              />
              <FormField
                name="dueDate"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">
                      Due Date <span className="text-sm opacity-80">(optional)</span>
                    </FormLabel>
                    <FormControl>
                      <Input className="text-base" disabled={isSubmitting} type="date" {...field} />
                    </FormControl>
                    <FormMessage className="font-bold text-red-700" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="class"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Assign a class</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue className="text-base" placeholder="Select a class" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-background text-base text-white">
                        {classes.map((c: any) => (
                          <SelectItem
                            key={c.id}
                            value={c.id}
                            className="text-base hover:bg-secondary-800"
                            defaultChecked={c.id === classId!}
                          >
                            {c.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="font-bold text-red-700" />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              name="link"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Link</FormLabel>
                  <FormControl>
                    <Input
                      className="text-base"
                      disabled={isSubmitting}
                      placeholder="Paste Link here..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="font-bold text-red-700" />
                </FormItem>
              )}
            />
            <FormField
              name="details"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Details</FormLabel>
                  <FormControl>
                    {/* <Textarea
                      className="text-base"
                      disabled={isSubmitting}
                      placeholder="Write some details here..."
                      {...field}
                    /> */}
                    <div data-color-mode="light" className="border rounded-md overflow-hidden">
                      <MDEditor
                        value={field.value || ""} // Add default empty string
                        onChange={(newValue) => field.onChange(newValue || "")}
                        height={400}
                        preview="edit"
                        previewOptions={{
                          components: {
                            code: ({ inline, children = [], className, ...props }) => {
                              // Add inline parameter
                              if (typeof children === "string" && /^\$\$(.*)\$\$/.test(children)) {
                                const html = katex.renderToString(
                                  children.replace(/^\$\$(.*)\$\$/, "$1"),
                                  { throwOnError: false }
                                );
                                return (
                                  <code
                                    dangerouslySetInnerHTML={{ __html: html }}
                                    style={{ background: "transparent" }}
                                  />
                                );
                              }
                              const code =
                                props.node && props.node.children
                                  ? getCodeString(props.node.children)
                                  : children;

                              if (
                                typeof code === "string" &&
                                typeof className === "string" &&
                                /^language-katex/.test(className.toLowerCase()) // Fix casing
                              ) {
                                const html = katex.renderToString(code, {
                                  throwOnError: false,
                                });
                                return (
                                  <code
                                    style={{ fontSize: "150%" }}
                                    dangerouslySetInnerHTML={{ __html: html }}
                                  />
                                );
                              }
                              return <code className={String(className)}>{children}</code>;
                            },
                          },
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="font-bold text-red-700" />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-3">
              <Button
                className="bg-red-700"
                onClick={() => {
                  router.push(`/courses/${courseId}/class/${classId}`);
                }}
                variant="destructive"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gray-600 hover:bg-gray-700"
              >
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default NewAttachmentPage;
