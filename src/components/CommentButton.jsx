/* eslint-disable react/prop-types */
import {
    IconButton,
    ButtonGroup,
    Button
} from "@mui/material";
import {
    ChatBubbleOutline as CommentIcon
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
export function CommentButton({ item, comment }) {
    const navigate = useNavigate();
    return (
        <>
            {!comment && (
                <ButtonGroup sx={{ ml: 3 }}>
                    <IconButton size="small">
                        <CommentIcon
                            fontSize="small"
                            color="info"
                        />
                    </IconButton>
                    <Button onClick={(e) => {
                        navigate(`/comments/${item.id}`);
                        e.stopPropagation()
                    }}
                        sx={{ color: "text.fade" }}
                        variant="text"
                        size="small">
                        {item.comments?.length || 0}
                    </Button>
                </ButtonGroup>
            )}
        </>
    );
}
