"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import emailjs from '@emailjs/browser';
import { emailjsConfig, EmailTemplateParams } from "@/lib/emailjs.config";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { formSchema } from "@/lib/schema";
import { Input } from "@/components/ui/input";
import ButtonFlip from "@/components/elements/button/ButtonFlip";

type Props = {
  btnText?: string;
};

const FlexibleForm = ({ btnText }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const form = useForm<z.infer<typeof formSchema> & { phone?: string }>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // Template parameters for EmailJS
      const templateParams: EmailTemplateParams = {
        from_name: values.name,
        from_email: values.email,
        phone: values.phone || 'Not provided',
        subject: values.subject,
        message: values.message,
        to_email: 'ecomlifters@gmail.com',
      };

      await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        templateParams as unknown as Record<string, unknown>,
        emailjsConfig.publicKey
      );
      
      setSubmitStatus('success');
      form.reset(); // Reset form after successful submission
    } catch (error) {
      console.error('Email sending failed:', error);
      setSubmitStatus('error');
      setErrorMessage('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className=" grid gap-y-[50px] gap-x-[30px] md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Name*"
                    {...field}
                    className="blog-form-input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Email*"
                    {...field}
                    className="blog-form-input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Phone"
                    {...field}
                    className="blog-form-input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Subject*"
                    {...field}
                    className="blog-form-input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormControl>
                  <Input
                    placeholder="Message*"
                    {...field}
                    className="blog-form-input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <div className="text-green-600 text-center py-2">
            ✅ Message sent successfully! We'll get back to you soon.
          </div>
        )}
        
        {submitStatus === 'error' && (
          <div className="text-red-600 text-center py-2">
            ❌ {errorMessage}
          </div>
        )}

        <ButtonFlip
          className="bg-black text-text-fixed-2 !mt-[60px]"
          btnText={isLoading ? "Sending..." : (btnText || "Submit")}
          type="submit"
          disabled={isLoading}
        />
      </form>
    </Form>
  );
};

export default FlexibleForm;
