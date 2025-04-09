import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { CopyIcon } from "lucide-react";
import type { Column } from "./DisplayTable";

interface ViewModalProps {
  isViewModalOpen: boolean;
  handleDialogClose: () => void;
  selectedRow: Record<string, any> | null;
  columns: Column[];
}

const ViewModal = ({
  isViewModalOpen,
  handleDialogClose,
  selectedRow,
  columns,
}: ViewModalProps) => (
  <Dialog open={isViewModalOpen} onOpenChange={handleDialogClose}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>View Record</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        {columns
          .filter((col) => !col.hidden)
          .map((col) => (
            <div key={col.key} className="space-y-2 relative group">
              <div>
                <Label>{col.label || col.name}</Label>
                <div className="relative">
                  <div className="p-2 border rounded-md bg-muted">
                    {selectedRow?.[col.key]}
                  </div>
                  <Button
                    className="absolute top-1/2 -translate-y-1/2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    variant="ghost"
                    size="sm"
                    onClick={async () => {
                      await navigator.clipboard.writeText(selectedRow?.[col.key]);
                      toast.success(`${col.label || col.name} copied successfully`);
                    }}
                  >
                    <CopyIcon className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        <div className="flex justify-end">
          <Button onClick={handleDialogClose}>Close</Button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
);

export default ViewModal