import React, { useState } from 'react';
import { Box, Modal, Typography } from '@mui/material';
import CustomButtonWithLabel from '../button/button';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';

const CustomModal = ({ title, children, titleModal, onSave, onSaveTitle }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <CustomButtonWithLabel
        variantCustom={'contained'}
        onClick={handleOpen}
        label={title}
      />
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            width: '40%',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {titleModal}
            </Typography>
            <CustomButtonWithLabel
              variantCustom={'text'}
              icons={<CloseIcon color="primary" />}
              onClick={handleClose}
            />
          </Box>
          <hr />
          <Box sx={{ margin: '2%' }}>{children}</Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: '15px',
              justifyContent: 'flex-end',
            }}
          >
            <CustomButtonWithLabel
              variantCustom={'contained'}
              onClick={handleClose}
              label={t('modal.cancel')}
            />
            <CustomButtonWithLabel
              variantCustom={'contained'}
              onClick={() => [onSave, setOpen(false)]}
              label={onSaveTitle}
            />
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default CustomModal;
