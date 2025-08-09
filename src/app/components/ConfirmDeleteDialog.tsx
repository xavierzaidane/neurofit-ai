import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";


type ConfirmDeleteDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  planName: string;
};

const ConfirmDeleteDialog = ({
  open,
  onOpenChange,
  onConfirm,
  planName,
}: ConfirmDeleteDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Plan</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the plan &quot;<strong>{planName}</strong>&quot;? This action can&apos;t be undone.
          </DialogDescription>


        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            className="bg-red-600/80 hover:bg-red-700/90 text-white"
            onClick={onConfirm}
            >
            Delete
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDeleteDialog;
