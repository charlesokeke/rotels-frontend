import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class FormDialog extends React.PureComponent {
  state ={
    value:"",
    open:false,

  }
  getValue = (event) => {
     this.setState({value:event.target.value})
  }
  handleClickOpen = () => {
    
    this.setState({ open: true });
  }
  handleClickClose = () => {
    this.setState({ open: false });
  }

  render() {
    const{ handleClose} = this.props

    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen} size="small">
          Edit Address
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClickClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Start Address</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter a new start address to reset the driving directions map with a new start address
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="New Start address"
              type="text"
              onChange={this.getValue}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClickClose} color="primary">
              Cancel
            </Button>
            <Button onClick={() =>handleClose(this.state.value)} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}