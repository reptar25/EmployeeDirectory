import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function CreateDialog(props) {

    const [open, setOpen] = React.useState(false);
    const newEmployee = {};

    const handleClickOpen = () => {
        setOpen(true)
    };

    const handleClose = () => {
        setOpen(false);
    };

	const handleSubmit = element => {
		element.preventDefault();
		props.onCreate(newEmployee);
		// Navigate away from the dialog to hide it.
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
            <TextField onChange={handleChange} key={attribute} type="text" margin="dense" label={attribute} id={attribute} fullWidth/>
        );
    });

      return (
        <div>
          <Button className="menuItem" style={{marginTop: 10}} color="primary" onClick={handleClickOpen}>
            Create a New Employee
          </Button>
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Create a New Employee</DialogTitle>
            <DialogContent>
                {inputs}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="secondary" variant="outlined">
                Cancel
              </Button>
              <Button onClick={handleSubmit} color="primary" variant="outlined">
                Create
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
}