import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function DeleteDialog(props){
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmDelete = () => {
    props.onDelete(props.employee);
  }

  return (
    <div>

      <Button
        color="secondary"
        onClick={handleClickOpen}>
        Delete
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >

        <DialogTitle id="alert-dialog-title">
          {"Delete employee?"}
        </DialogTitle>

        <DialogContent>

          <DialogContentText id="alert-dialog-description">

            {"Are you sure you want to delete the employee "+props.employee.firstName+" "+props.employee.lastName+"?"}
          </DialogContentText>

        </DialogContent>

        <DialogActions>

          <Button
            onClick={handleClose}
            color="primary"
            variant="outlined">
            Cancel
          </Button>

          <Button
            onClick={handleConfirmDelete}
            color="secondary"
            variant="outlined">
            Delete
          </Button>

        </DialogActions>

      </Dialog>

    </div>
  );
}
