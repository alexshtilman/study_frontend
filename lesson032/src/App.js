import React, { useEffect } from "react";
import "./App.css";
import {
  FIELD_PROPS,
  UPDATE_INTERVAL,
  CARD_PROPS,
} from "./configuration/config";
import {
  Container,
  Card,
  CardContent,
  Box,
  Grid,
  CssBaseline,
  Button,
  ButtonGroup,
} from "@material-ui/core";
import FieldFillService from "./service/FieldFillService";
import RowElement from "./components/RowElement.js";
function App() {
  const fieldSrv = new FieldFillService();
  const [field, setField] = React.useState(fieldSrv.init());
  const [started, setStarted] = React.useState(false);
  const pollingState = React.useRef();

  const setFieldCell = (x, y) => {
    let newField = [...field];
    newField[x][y] = 1;
    setField(newField);
  };

  const updateFn = () => {
    fieldSrv.updateFn(field).then((data) => {
      setField([...data]);
    });
  };

  const start = () => {
    setStarted(true);
  };

  const reset = () => {
    setStarted(false);
    setField(fieldSrv.init());
    clearInterval(pollingState.current);
  };
  const stop = () => {
    setStarted(false);
    clearInterval(pollingState.current);
  };
  const random = () => {
    setStarted(false);
    setField(fieldSrv.random());
    clearInterval(pollingState.current);
  };
  useEffect(() => {
    if (started) {
      const id = setInterval(() => {
        updateFn();
      }, UPDATE_INTERVAL);

      pollingState.current = id;
    } else {
      clearInterval(pollingState.current);
    }
    return () => {
      clearInterval(pollingState.current);
    };
  }, [started, updateFn]);
  return (
    <Box my={3}>
      <Container
        component="main"
        style={{ height: CARD_PROPS.height, width: CARD_PROPS.width }}
      >
        <CssBaseline />

        <Box mb={1} style={{ textAlign: "center" }}>
          <ButtonGroup
            color="primary"
            aria-label="outlined primary button group"
            variant="contained"
          >
            <Button onClick={start} disabled={started}>
              start
            </Button>
            <Button onClick={stop} disabled={!started}>
              stop
            </Button>
            <Button onClick={updateFn} disabled={started}>
              tick
            </Button>
            <Button onClick={reset} disabled={started}>
              reset
            </Button>
            <Button onClick={random} disabled={started}>
              random
            </Button>
          </ButtonGroup>
        </Box>

        <Card>
          <CardContent>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Box
                style={{
                  ...FIELD_PROPS,
                }}
              >
                {field.map((row, indexX) => {
                  return (
                    <React.Fragment key={`myIndex_${indexX}`}>
                      <RowElement
                        indexX={indexX}
                        row={row}
                        setFieldCell={setFieldCell}
                        started={started}
                      />
                    </React.Fragment>
                  );
                })}
              </Box>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default App;
