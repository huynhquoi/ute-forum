import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "../ui/alert-dialog"

type NotificationProps = {
  title: string,
  content: string,
  action?: boolean,
  onOK?: () => void,
  onCancel?: () => void
}

const Notification = ({
  children,
  title,
  content,
  action,
  onOK,
  onCancel
}: Readonly<{
  children: React.ReactNode;
}> & NotificationProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {content}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => {
            if (typeof onCancel !== "undefined") {
              onCancel()
            }
          }}>
            Cancel
          </AlertDialogCancel>
          {action
            ? <AlertDialogAction
              onClick={() => {
                if (typeof onOK !== "undefined") {
                  onOK()
                }
              }}>
              Continue
            </AlertDialogAction>
            : <></>}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default Notification