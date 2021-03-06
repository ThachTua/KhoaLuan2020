import React, { useContext } from "react";

import {
  MenuItem,
  FormControl,
  Grid,
  TextField,
  makeStyles,
  Typography,
} from "@material-ui/core";

import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import CategoryContext from "../../../../containers/CategoryContext";

import AutocompleteCover from "../../../../share/component/AutoCompleteCover.Component";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(1),
  },
  paper: {
    //padding: theme.spacing(1),
  },
  date: {
    width: theme.spacing(24),
    marginRight: theme.spacing(2),
  },
}));

const Search = (props) => {
  const classes = useStyles();
  const { Filter, setFilter } = props;

  const Category = useContext(CategoryContext);

  return (
    <Grid className={classes.root} container spacing={1}>
      <Grid className={classes.paper} container spacing={2}>
        <Grid item xs={3}>
          Mã nhân viên
          <TextField
            placeholder="Vui lòng nhập"
            value={!Filter.CodeEmp ? "" : Filter.CodeEmp}
            onChange={(event) => {
              if ("" !== event.target.value.trim())
                return setFilter({
                  ...Filter,
                  ...{ CodeEmp: event.target.value.trim() },
                });
              const { CodeEmp, ...FilterNew } = Filter;
              setFilter(FilterNew);
            }}
            variant="outlined"
            size="small"
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          Tên nhân viên
          <TextField
            value={!Filter.ProfileName ? "" : Filter.ProfileName}
            onChange={(event) => {
              if ("" !== event.target.value.trim())
                return setFilter({
                  ...Filter,
                  ...{ ProfileName: event.target.value },
                });
              const { ProfileName, ...FilterNew } = Filter;
              setFilter(FilterNew);
            }}
            placeholder="Vui lòng nhập"
            variant="outlined"
            size="small"
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          Số CMND
          <TextField
            value={!Filter.IDNo1 ? "" : Filter.IDNo1}
            onChange={(event) => {
              if ("" !== event.target.value.trim())
                return setFilter({
                  ...Filter,
                  ...{ IDNo1: event.target.value.trim() },
                });
              const { IDNo1, ...FilterNew } = Filter;
              setFilter(FilterNew);
            }}
            placeholder="Vui lòng nhập"
            variant="outlined"
            size="small"
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <FormControl fullWidth>
            Danh sách đen
            <TextField
              select
              value={!Filter.IsBlackList ? "" : Filter.IsBlackList}
              onChange={(event) => {
                if ("" !== event.target.value.trim())
                  return setFilter({
                    ...Filter,
                    ...{ IsBlackList: event.target.value },
                  });
                const { IsBlackList, ...FilterNew } = Filter;
                setFilter(FilterNew);
              }}
              size="small"
              variant="outlined"
            >
              {BlackLisst.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
        </Grid>
      </Grid>
      <Grid className={classes.paper} container spacing={2}>
        <Grid item xs={3}>
          <FormControl fullWidth>
            Chức vụ
            {
              <AutocompleteCover
                filterSelectedOptions
                multiple
                limitTags={1}
                defaultValue={[]}
                options={Category.ListPosition}
                getOptionLabel={(option) =>
                  `${option.PositionName}-${option.Code}`
                }
                getOptionSelected={(option, value) => option.ID === value.ID}
                renderOption={(option) => (
                  <Typography>{`${option.Code} - ${option.PositionName}`}</Typography>
                )}
                renderInput={(params) => (
                  <TextField {...params} size="small" variant="outlined" />
                )}
                onChange={(event, item) => {
                  if (0 < item.length) {
                    return setFilter({
                      ...Filter,
                      ...{ PositionID: { $in: item.map((i) => i.ID) } },
                    });
                  }
                  const { PositionID, ...FilterNew } = Filter;
                  setFilter(FilterNew);
                }}
              />
            }
          </FormControl>
        </Grid>

        <Grid item xs={3}>
          <FormControl fullWidth>
            Giới tính
            {
              <TextField
                select
                value={!Filter.Gender ? "" : Filter.Gender}
                onChange={(event) => {
                  if ("" !== event.target.value.trim())
                    return setFilter({
                      ...Filter,
                      ...{ Gender: event.target.value.trim() },
                    });
                  const { Gender, ...FilterNew } = Filter;
                  setFilter(FilterNew);
                }}
                size="small"
                variant="outlined"
              >
                {GenderValue.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            }
          </FormControl>
        </Grid>
        {
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid item xs={5}>
              <FormControl fullWidth>
                Ngày nhận hồ sơ
                <div>
                  <KeyboardDatePicker
                    inputVariant="outlined"
                    clearable
                    label="Từ ngày"
                    size="small"
                    fullWidth={false}
                    className={classes.date}
                    format="dd/MM/yyyy"
                    value={
                      !Filter.DateHire
                        ? null
                        : !Filter.DateHire["$gte"]
                        ? null
                        : Filter.DateHire["$gte"]
                    }
                    maxDate={
                      !Filter.DateHire
                        ? new Date()
                        : !Filter.DateHire["$lte"]
                        ? new Date()
                        : Filter.DateHire["$lte"]
                    }
                    onChange={(date) => {
                      if (null !== date)
                        return setFilter({
                          ...Filter,
                          ...{ DateHire: { ...Filter.DateHire, $gte: date } },
                        });
                      if (!Filter.DateHire) {
                        const { DateHire, ...FilterNew } = Filter;
                        return setFilter(FilterNew);
                      }
                      const { $gte, ...DateHireNew } = Filter.DateHire;
                      setFilter({ ...Filter, DateHire: DateHireNew });
                    }}
                  />
                  <KeyboardDatePicker
                    inputVariant="outlined"
                    clearable
                    size="small"
                    fullWidth={false}
                    className={classes.date}
                    minDate={
                      !Filter.DateHire
                        ? 0
                        : !Filter.DateHire["$gte"]
                        ? 0
                        : Filter.DateHire["$gte"]
                    }
                    maxDate={new Date()}
                    label="Đến ngày"
                    format="dd/MM/yyyy"
                    value={
                      !Filter.DateHire
                        ? null
                        : !Filter.DateHire["$lte"]
                        ? null
                        : Filter.DateHire["$lte"]
                    }
                    onChange={(date) => {
                      if (null !== date)
                        return setFilter({
                          ...Filter,
                          ...{ DateHire: { ...Filter.DateHire, $lte: date } },
                        });
                      if (!Filter.DateHire) {
                        const { DateHire, ...FilterNew } = Filter;
                        return setFilter(FilterNew);
                      }
                      const { $lte, ...DateHireNew } = Filter.DateHire;
                      setFilter({ ...Filter, DateHire: DateHireNew });
                    }}
                  />
                </div>
              </FormControl>
            </Grid>
          </MuiPickersUtilsProvider>
        }
      </Grid>
    </Grid>
  );
};

export default Search;

const GenderValue = [
  {
    value: "",
    label: "None",
  },
  {
    value: "E_MALE",
    label: "Nam",
  },
  {
    value: "E_FEMALE",
    label: "Nữ",
  },
];

const BlackLisst = [
  {
    value: "",
    label: "None",
  },
  {
    value: "0",
    label: "Bình thường",
  },
  {
    value: "1",
    label: "Có trong danh sách đen",
  },
];
