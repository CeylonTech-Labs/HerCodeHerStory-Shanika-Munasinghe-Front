"use client";

import { useState } from "react";
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
  const [open, setOpen] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);

  return (
    <Dialog open={open} onOpenChange={(nextOpen) => !isConfirming && setOpen(nextOpen)}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md p-6">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" disabled={isConfirming} onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            type="button"
            variant="secondary"
            disabled={isConfirming}
            onClick={async () => {
              try {
                setIsConfirming(true);
                await onConfirm();
                setOpen(false);
              } catch (error) {
                toast.error(getApiErrorMessage(error, "Action failed."));
              } finally {
                setIsConfirming(false);
              }
            }}
          >
            {isConfirming ? "Working..." : "Confirm"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
