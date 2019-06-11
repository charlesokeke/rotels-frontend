import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Icon from '@material-ui/core/Icon';

export default class FormDialog extends React.PureComponent {


  
  render() {

    const{handleClickOpen, handleClickClose, handleChangeStartAddress, open, handleClose} = this.props

    return (
      <div>
        <Button variant="outlined" color="primary" onClick={handleClickOpen} size="small">
          Edit Address
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Start Address</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Change Origin Address
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="New Start address"
              type="email"
              fullWidth
              onChange={handleChangeStartAddress}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClickClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleClose} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}