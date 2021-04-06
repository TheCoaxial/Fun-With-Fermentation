import React from "react";
import TimerIcon from '@material-ui/icons/Timer';
import Typography from '@material-ui/core/Typography';
import { TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot, TimelineOppositeContent } from "@material-ui/lab";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    timelineContent: {
        padding: '12px 16px',
    },
    secondaryTail: {
        backgroundColor: theme.palette.secondary.main,
    },
    verticallyCenterContent: {
        margin: 'auto 0',
    },
}));

export default function Step({ duration, instructions }) {

    const classes = useStyles();
    if (instructions.length) {
        return(        
            <TimelineItem>
                <TimelineOppositeContent
                    className={classes.verticallyCenterContent}
                    align="right"
                    variant="body2"
                    color="textSecondary"
                >
                    {duration}
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot>
                        <TimerIcon />
                    </TimelineDot>
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent className={classes.timelineContent}>
                    <Typography variant="h6" component="span">
                        {instructions}
                    </Typography>
                    {/* <Typography>duration: {duration}</Typography> */}
                </TimelineContent>
            </TimelineItem>
        )
    } else { return null; }
};