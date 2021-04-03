import React from "react";
import TimerIcon from '@material-ui/icons/Timer';
import Typography from '@material-ui/core/Typography';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
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

export default function Step({ stepNumber, duration, instructions }) {

    const classes = useStyles();

    return(
        
            <TimelineItem>
                <TimelineOppositeContent
                className={classes.verticallyCenterContent}
                align="right"
                variant="body2"
                color="textSecondary"
                >
                {stepNumber}
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
};