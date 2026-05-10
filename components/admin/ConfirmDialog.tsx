"use client";

import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/lib/api";

export function ConfirmDialog({
  title = "Are you sure?",
  description = "This action cannot be undone.",
  onConfirm,
  children
}: {
  title?: string;
  description?: string;
  onConfirm: () => void;
  children: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md p-6">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2">
          <DialogTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogTrigger>
          <Button
            variant="secondary"
            onClick={async () => {
              try {
                await onConfirm();
              } catch (error) {
                toast.error(getApiErrorMessage(error, "Action failed."));
              }
            }}
          >
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
