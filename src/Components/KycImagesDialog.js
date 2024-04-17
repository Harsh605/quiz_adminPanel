import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function KycImageDialog({ open, setOpen, data }) {



    return (
        <React.Fragment>

            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"KYC details"}
                </DialogTitle>
                <DialogContent>
                    <div className='flex'>
                        <div style={{ marginRight: '20px' }}>
                            <p style={{ color: "black",marginBottom:"20px" }}>Aadhar Card Front</p>
                            <img src={`${process.env.REACT_APP_API_URL}/uploads/${data?.kycs?.adhaarFront}`} alt="" style={{ height: '250px', width: '250px' }} />
                        </div>
                        <div style={{ marginRight: '20px' }}>
                            <p style={{ color: "black" ,marginBottom:"20px"}}>Aadhar Card Back</p>
                            <img src={`${process.env.REACT_APP_API_URL}/uploads/${data?.kycs?.adhaarBack}`} alt="" style={{ height: '250px', width: '250px' }} />
                        </div>
                        <div>
                            <p style={{ color: "black",marginBottom:"20px" }}>Pan Card Front</p>
                            <img src={`${process.env.REACT_APP_API_URL}/uploads/${data?.kycs?.panFront}`} alt="" style={{ height: '250px', width: '250px' }} />
                        </div>
                    </div>
                    <div style={{ marginTop: '20px',display:"flex",justifyContent:"space-around" }}>
                        <p style={{ color: "black",marginBottom:"20px" }}>Aadhar No-{data?.kycs?.adhaar}</p>
                        <p style={{ color: "black" }}>Pan No-{data?.kycs?.pan}</p>

                    </div>
                </DialogContent>


            </Dialog>
        </React.Fragment>
    );
}