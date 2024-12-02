"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
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
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "next-auth/react";

import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Job title must be at least 2 characters.",
  }),
  location: z.string().min(2, {
    message: "Job location must be at least 2 characters.",
  }),
  designation: z.string().min(2, {
    message: "Job designation must be at least 2 characters.",
  }),
  salary: z.string().refine(
    (value) => {
      const parsed = parseFloat(value);
      return !isNaN(parsed) && parsed >= 10000;
    },
    {
      message: "Job salary must be at least 10000.",
    }
  ),
  description: z.string().min(10, {
    message: "Job description must be at least 10 characters.",
  }),
  companyName: z.string().min(5, {
    message: "Company Name must be at least 5 characters.",
  }),
  userId: z.string(),
});

export default function CreateJob() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: session, status } = useSession();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      location: "",
      salary: "",
      description: "",
      companyName: "",
      userId: session?.user.id,
      designation: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      console.log("onSubmit job", values);
      const response = await axios.post("/api/recruiter/create-job", values);
      form.reset();
      router.refresh();
    } catch (error) {
      console.error("Failed to create job:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter job title" {...field} />
              </FormControl>
              <FormDescription>
                The title of the job position you're hiring for.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="designation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Designation</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={(value) => field.onChange(value)} // Bind to react-hook-form
                >
                  <SelectTrigger className="w-[180px] border-none">
                    <SelectValue placeholder="Select Designation" />
                  </SelectTrigger>
                  <SelectContent className="bg-black text-gray-400 border-none">
                    <SelectItem value="software-engineer">
                      Software Engineer
                    </SelectItem>
                    <SelectItem value="data-scientist">
                      Data Scientist
                    </SelectItem>
                    <SelectItem value="product-manager">
                      Product Manager
                    </SelectItem>
                    <SelectItem value="marketing-specialist">
                      Marketing Specialist
                    </SelectItem>
                    <SelectItem value="ui-ux-designer">
                      UI/UX Designer
                    </SelectItem>
                    <SelectItem value="hr-manager">
                      Human Resources Manager
                    </SelectItem>
                    <SelectItem value="business-analyst">
                      Business Analyst
                    </SelectItem>
                    <SelectItem value="sales-executive">
                      Sales Executive
                    </SelectItem>
                    <SelectItem value="devops-engineer">
                      DevOps Engineer
                    </SelectItem>
                    <SelectItem value="customer-support">
                      Customer Support Representative
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>
                Select the designation for the job.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Location</FormLabel>
              <FormControl>
                <Input placeholder="Enter job location" {...field} />
              </FormControl>
              <FormDescription>
                The location of the job you're hiring for.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter company name" {...field} />
              </FormControl>
              <FormDescription>
                The name of the company hiring for the job.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Description</FormLabel>
              <FormControl>
                <ReactQuill
                  theme="snow"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Enter job description with rich text formatting"
                  className="min-h-10 text-white"
                />
              </FormControl>
              <FormDescription>
                Provide a detailed job role and responsibilities.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="salary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Salary</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Enter job salary" {...field} />
              </FormControl>
              <FormDescription>
                The salary of the job you're hiring for.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create Job Listing"}
        </Button>
      </form>
    </Form>
  );
}
