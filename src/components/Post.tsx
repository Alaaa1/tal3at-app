import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { MoreHoriz } from '@mui/icons-material';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { Switch } from '@mui/material';

const Post = (props: { name: string; likes: number; image: string; id: string }) => {
  const { id, name, likes, image } = props;
  const [color, setColor] = useState<'default' | 'success'>();
  const [postColor, setPostColor] = useState<'red' | string>();
  const [fontColor, setFontColor] = useState<'black' | 'white'>()

  const mutation = useMutation({
    mutationFn: async () => {
      await fetch(`https://zexkx72ghe.execute-api.us-east-1.amazonaws.com/dev/v1/posts/${id}`, {
        mode: 'no-cors',
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });
    }
  });

  const onLike = () => {
    mutation.mutate();
    setColor('success');
  };

  const onToggle = () => {
    if (postColor === 'black') {
      setPostColor('grey');
      setFontColor('black')
    } else {
      setPostColor('black');
      setFontColor('white')
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 700,
        width: 500,
        display: 'flex',
        flexDirection: 'column',
        margin: 5,
        backgroundColor: postColor,
        color: fontColor
      }}
    >
      <Switch onChange={onToggle} defaultChecked />
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreHoriz />
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <CardMedia
          sx={{ maxWidth: 300, maxHeight: 300 }}
          component="img"
          width="700"
          height="500"
          image={image ? image : 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Gragas_2.jpg'}
          alt="Paella dish"
        />
      </div>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {name}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={onLike} color={color}>
          <FavoriteIcon />
          {likes}
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Post;
