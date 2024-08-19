// src/components/ModalShare.js
import React from 'react';
import { Modal, Box, IconButton, Typography } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CloseIcon from '@mui/icons-material/Close';

const ModalShare = ({ show, handleClose, shareUrl }) => {
  const shareMessage = "Confira esta biblioteca incrível!";

  const handleShare = (platform) => {
    let shareLink = '';
    switch (platform) {
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareMessage)}`;
        break;
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareMessage)}`;
        break;
      case 'linkedin':
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'instagram':
        // Instagram doesn't have a direct share link for websites, so this can just redirect to Instagram.
        shareLink = `https://www.instagram.com/`;
        break;
      case 'whatsapp':
        shareLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage + ' ' + shareUrl)}`;
        break;
      default:
        break;
    }
    window.open(shareLink, '_blank', 'noopener,noreferrer');
  };

  return (
    <Modal
      open={show}
      onClose={handleClose}
      aria-labelledby="share-modal-title"
      aria-describedby="share-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 300,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleClose}
          sx={{ position: 'absolute', top: 8, right: 12 }}
        >
          <CloseIcon />
        </IconButton>
        <Typography id="share-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
          Compartilhar Biblioteca
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
          <IconButton
            color="primary"
            onClick={() => handleShare('facebook')}
            sx={{ fontSize: 40 }}
          >
            <FacebookIcon sx={{ fontSize: 40 }} />
          </IconButton>
          <IconButton
            color="primary"
            onClick={() => handleShare('twitter')}
            sx={{ fontSize: 40 }}
          >
            <TwitterIcon sx={{ fontSize: 40 }} />
          </IconButton>
          <IconButton
            color="primary"
            onClick={() => handleShare('linkedin')}
            sx={{ fontSize: 40 }}
          >
            <LinkedInIcon sx={{ fontSize: 40 }} />
          </IconButton>
          <IconButton
            color="primary"
            onClick={() => handleShare('instagram')}
            sx={{ fontSize: 40 }}
          >
            <InstagramIcon sx={{ fontSize: 40 }} />
          </IconButton>
          <IconButton
            color="primary"
            onClick={() => handleShare('whatsapp')}
            sx={{ fontSize: 40 }}
          >
            <WhatsAppIcon sx={{ fontSize: 40 }} />
          </IconButton>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalShare;
