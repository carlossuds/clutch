import { cloneDeep } from "lodash";
import { useCallback, useMemo, useState } from "react";
import { Actions } from "../enums";

type BucketType = "X" | "Y";
type ActionType = {
  action: Actions;
  targetBucket: BucketType;
};
type Step = { X: number; Y: number; explanation: string };

const getExplanationText = ({ action, targetBucket }: ActionType) => {
  switch (action) {
    case Actions.FILL:
      return `Fill bucket ${targetBucket}`;
    case Actions.EMPTY:
      return `Empty bucket ${targetBucket}`;
    case Actions.TRANSFER: {
      const originBucket = targetBucket === "X" ? "Y" : "X";
      return `Transfer from bucket ${originBucket} to bucket ${targetBucket}`;
    }
    default: {
      const exhaustiveCheck: never = action;
      throw new Error(`Unhandled action ${exhaustiveCheck}`);
    }
  }
};

export const useHome = () => {
  const [bucketsVolume, setBucketsVolume] = useState({
    X: 0,
    Y: 0,
    Z: 0,
  });
  const [hasError, setHasError] = useState(false);
  const [steps, setSteps] = useState<Array<ActionType>>([]);

  const onFieldChange = useCallback(
    ({ bucket, volume }: { bucket: BucketType | "Z"; volume: number }) => {
      const clonedState = cloneDeep(bucketsVolume);
      clonedState[bucket] = volume;
      setBucketsVolume(clonedState);
    },
    [bucketsVolume]
  );

  const onSubmit = useCallback(() => {
    const { X, Y, Z } = bucketsVolume;
    const isZGreaterThanBoth = Z > X && Z > Y;

    if (isZGreaterThanBoth) {
      setHasError(true);
      return;
    }

    // Find who Z is closer to
    const smallBucket = X > Y ? "Y" : "X";
    const bigBucket = X < Y ? "Y" : "X";

    const smallVolume = bucketsVolume[smallBucket];
    const bigVolume = bucketsVolume[bigBucket];

    const differenceToSmall = Z - smallVolume;
    const differenceToBig = bigVolume - Z;

    const closestToZ =
      differenceToBig > differenceToSmall ? smallBucket : bigBucket;

    // Handles special case when Z is smaller than both.
    // e.g: X: 70, Y: 90, Z: 20
    if (Z === bigVolume - smallVolume) {
      setSteps([
        {
          action: Actions.FILL,
          targetBucket: bigBucket,
        },
        {
          action: Actions.TRANSFER,
          targetBucket: smallBucket,
        },
      ]);
      return;
    }

    const currentSteps: Array<ActionType> = [
      {
        action: Actions.FILL,
        targetBucket: closestToZ,
      },
    ];

    // Handles special case when Z is equal to any of the buckets
    if (Z === bucketsVolume[closestToZ]) {
      return;
    }

    let count = 0;
    // Handling generic cases. e.g: X < Z < Y
    // -> Remove X from Y until we get Z
    if (closestToZ === bigBucket) {
      const difference = bigVolume - count * smallVolume;
      while (Z < difference) {
        currentSteps.push(
          {
            action: Actions.TRANSFER,
            targetBucket: smallBucket,
          },
          {
            action: Actions.EMPTY,
            targetBucket: smallBucket,
          }
        );
        count++;
      }
      if (Z > difference) {
        setHasError(true);
        return;
      }
    }
    // -> Add X to Y until we get Z
    if (closestToZ === smallBucket) {
      const sum = count * smallVolume;
      while (Z > sum) {
        // ToDo: Why am I getting invalid array length here?
        currentSteps.push(
          {
            action: Actions.FILL,
            targetBucket: smallBucket,
          },
          {
            action: Actions.TRANSFER,
            targetBucket: bigBucket,
          }
        );
        count++;
      }
      if (Z > Y) {
        setHasError(true);
        return;
      }
    }
    setSteps(currentSteps);
    setHasError(false);
  }, [bucketsVolume]);

  const stepsTableData = useMemo(
    () =>
      steps.reduce((acc, { action, targetBucket }, index) => {
        const myObject: Step = {
          explanation: getExplanationText({
            action,
            targetBucket,
          }),
          X: 0,
          Y: 0,
        };
        switch (action) {
          case Actions.EMPTY: {
            myObject[targetBucket] = 0;
            break;
          }
          case Actions.FILL: {
            myObject[targetBucket] = bucketsVolume[targetBucket];
            break;
          }
          case Actions.TRANSFER: {
            const originBucket = targetBucket === "X" ? "Y" : "X";
            myObject[originBucket] =
              acc[index - 1][originBucket] - bucketsVolume[targetBucket];
            myObject[targetBucket] = bucketsVolume[targetBucket];
          }
        }
        acc.push(myObject);
        return acc;
      }, [] as Array<Step>),
    [steps, bucketsVolume]
  );

  console.log({
    steps,
    stepsTableData,
  });

  return {
    hasError,
    stepsTableData,
    onFieldChange,
    onSubmit,
  };
};
