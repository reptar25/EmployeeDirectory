import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';

export default function EditDialog(props) {
        const [open, setOpen] = React.useState(false);
        const newEmployee = props.employee;

        const handleClickOpen = () => {
            setOpen(true)
        };

        const handleClose = () => {
            setOpen(false);
        };


        const handleSubmit = element => {
            element.preventDefault();
            props.edit(props.employee, newEmployee);
            handleClose();
        }

        const handleChange = element => {
            newEmployee[element.target.id] = element.target.value;
        };

	    const inputs = [];
  		props.attributes.map(attribute =>
  		{
  		    if (attribute === 'id' || attribute === 'manager')
  		        return;
              inputs.push(
                  <TextField onChange={handleChange} key={attribute} type="text" margin="dense" label={attribute} defaultValue={props.employee[attribute]} id={attribute} fullWidth/>
          );
      });

		  return (
        <div>

          <Button color="primary"
          onClick={handleClickOpen}
          startIcon={<EditIcon />}>
            Edit
          </Button>

          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title">

            <DialogTitle id="form-dialog-title">
              Edit Employee
            </DialogTitle>

            <DialogContent>

              {inputs}
            </DialogContent>

            <DialogActions>

              <Button
                onClick={handleClose}
                color="secondary"
                variant="outlined">
                Cancel
              </Button>

              <Button
                onClick={handleSubmit}
                color="primary"
                variant="outlined"
                startIcon={<SaveIcon />}>
                Save
              </Button>

            </DialogActions>

          </Dialog>

        </div>
      );
}
