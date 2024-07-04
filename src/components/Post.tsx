import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red, blue } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { MoreHoriz } from '@mui/icons-material';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { Switch } from '@mui/material';

const Post = (props: { name: string; likes: number; image: string; id: string }) => {
  const { id, name, likes, image } = props;
  const [totalLikes, setTotalLikes] = useState(likes);
  const [color, setColor] = useState<'default' | 'success'>();
  const [postColor, setPostColor] = useState<'red' | 'black'>('black');
  const [fontColor, setFontColor] = useState<'black' | 'white'>('black');

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
    setTotalLikes(totalLikes + 1);
  };

  const onToggle = () => {
    if (postColor === 'black') {
      setPostColor('red');
      setFontColor('white');
    } else {
      setPostColor('black');
      setFontColor('black');
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
        backgroundColor: '#101010',
        color: fontColor,
        borderBottom: '2px solid #FFFFFF'
      }}
    >
      <Switch onChange={onToggle} defaultChecked />
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreHoriz
              sx={{
                color: 'white'
              }}
            />
          </IconButton>
        }
        sx={{
          color: 'white'
        }}
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
          sx={{ maxWidth: 300, maxHeight: 300, borderRadius: '20px' }}
          component="img"
          width="700"
          height="500"
          image={image ? image : 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Gragas_2.jpg'}
          alt="Paella dish"
        />
      </div>
      <CardContent>
        <Typography variant="body2" color="#FFFFFF">
          {name}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={onLike} color={color === 'success' ? 'error' : 'default'}>
          <FavoriteIcon />
          {totalLikes}
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Post;
