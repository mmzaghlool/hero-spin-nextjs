import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { UserContext } from '../../../configs/UserContext';
import Button from '../../forms/Button';
import styles from './Survey.module.scss';

type P = { imdbID: string };

const Survey = ({ imdbID }: P) => {
  const { user } = useContext(UserContext);
  const router = useRouter();

  const [feedback, setFeedback] = useState<boolean>(false);
  const [blackList, setBlackList] = useState<boolean>(false);

  const addToHistory = () => {
    setFeedback(true);
    // TODO: add to history
  };

  const wontWatch = () => {
    setBlackList(true);
    // TODO: add to blacklist
  };

  const addBlackListReason = (reason: string) => {
    setFeedback(true);
    // TODO: update blacklist reason
  };

  // Render feedback message
  if (feedback) {
    return (
      <p>
        Thank you for your feed back.{' '}
        <a href="#" onClick={() => router.reload()}>
          find another movie
        </a>
      </p>
    );
  }

  // Wont watch this movie
  if (blackList) {
    return (
      <>
        <h2>Could you tell us why won&apos;t you watch this movie?</h2>

        <div className={styles.row}>
          <Button onClick={addToHistory}>Already Watched</Button>
          <Button className={styles.danger} onClick={() => addBlackListReason('Not Marvel Movie !')}>
            Not Marvel Movie !
          </Button>
          <Button className={styles.third} onClick={() => addBlackListReason("I Don't like it")}>
            I Don&apos;t like it
          </Button>
        </div>
      </>
    );
  }

  // Render main buttons
  return (
    <>
      <h2>Will you watch this movie ?</h2>

      <div className={styles.row}>
        <Button onClick={addToHistory}>Yes</Button>
        <Button className={styles.danger} onClick={wontWatch}>
          No
        </Button>
        <Button className={styles.third}>Maybe later</Button>
      </div>
    </>
  );
};

export default Survey;
