import { useRouter } from "next/router";
import { useQuery } from "urql";
import { useEffect, useRef, useState, useContext } from "react";
import { SelectedContext } from "../../Context/context";
import { useToastContext, ADD, REMOVE_ALL } from "../../Context/ToastContext";
import Card from "../Card";
import Indicator from "../Card/Indicator";
import Table from "../Table";
import Dropdown from "../Dropdown";
import styles from "./Applicant.module.css";
import Expand from "../Expand";
import DISTRICT_QUERY from "./Queries/district.js";
import SERVICE_QUERY from "./Queries/service.js";
import DQI_QUERY from "./Queries/dqi.js";
import Metrics from "./Metrics";
import metric_styles from "./Metrics/Metrics.module.css";
import Skeleton from "../Spinner/Skeleton";
import DQI from "./DQI";

const ApplicantView = ({
  entity_number,
  year,
  scroll,
  scrollPos,
  scrollSync,
  checked = null,
  primary = false,
}) => {
  const { toastDispatch } = useToastContext();
  const { selected, dispatchSelectedEvent } = useContext(SelectedContext);
  const app = useRef(null);
  const [currentYear, setYear] = useState(year);
  const [service, setService] = useState({
    received: [],
    not_received: [],
  });
  const [dqis, setDQIs] = useState({
    open: [],
    closed: [],
  });
  const [head, setHead] = useState([
    null,
    "Line Item",
    "Purpose",
    "Download Speed (Mbps)",
    "Shared",
    "Quantity",
    "Lines Allocated",
    "Monthly Elig Recurring",
    "Total Elig Non-Recurring",
    "Months of Service",
    "Contract End Date",
  ]);

  const [result] = useQuery({
    query: DISTRICT_QUERY,
    variables: {
      funding_year: currentYear,
      entity_number: Number(entity_number),
    },
  });

  const { data, fetching, error } = result;

  const [service_result] = useQuery({
    query: SERVICE_QUERY,
    variables: {
      funding_year: currentYear,
      entity_number: Number(entity_number),
    },
  });

  const {
    data: service_data,
    fetching: service_fetching,
    error: service_error,
  } = service_result;

  const [dqi_result] = useQuery({
    query: DQI_QUERY,
    variables: {
      funding_year: currentYear,
      entity_number: Number(entity_number),
    },
  });

  const {
    data: dqi_data,
    fetching: dqi_fetching,
    error: dqi_error,
  } = dqi_result;

  useEffect(() => {
    if (service_fetching == true) return;
    let temp = [];
    let parent_temp = {
      received: [],
      not_received: [],
    };
    const types = ["received", "not_received"];

    const { items } = service_data.services;

    try {
      types.forEach((type) => {
        if (!items[type]) return;
        items[type].forEach((rec, index) => {
          let information = {
            frn: "",
            applicant: "",
            service_provider: "",
            narrative: "",
            status: "",
          };
          rec.frn.forEach((sub_item, index) => {
            information.frn = sub_item.frn;
            information.applicant = sub_item.applicant_ben;
            information.service_provider = sub_item.service_provider_name;
            information.narrative = sub_item.narrative;
            information.status = sub_item.status;

            let sub_temp = {
              data: [
                {
                  type: "input",
                  props: {
                    value: sub_item.service_id,
                    type: "checkbox",
                    onChange: (e) => dispatchSelectedEvent(e),
                  },
                },
                sub_item.line_item,
                sub_item.purpose,
                sub_item.download_speed_mbps,
                {
                  type: Indicator,
                  props: {
                    cleared: !sub_item.shared,
                  },
                },
                sub_item.num_lines,
                sub_item.district_num_lines,
                `$${sub_item.monthly_recurring_eligible_costs}`,
                `$${sub_item.total_non_recurring_eligible_costs}`,
                sub_item.months_of_service,
                sub_item.contract_expiration_date,
              ],
            };
            if (!primary) {
              sub_temp.data.shift();
            }
            temp.push(sub_temp);
          });
          parent_temp[type].push({ info: information, data: temp });
          temp = [];
        });
      });
      setService(parent_temp);
    } catch (err) {
      toastDispatch({
        type: ADD,
        payload: {
          content: { success: "Failed", message: err },
          type: "emergency",
        },
      });
      setService([]);
    }
  }, [service_data]);

  useEffect(() => {
    if (dqi_fetching == true) return;

    const { items } = dqi_data.dqis;

    const temp = {
      open: [],
      closed: [],
    };

    items.forEach((dqi, index) => {
      if (dqi.open) {
        temp.open.push(dqi);
      } else {
        temp.closed.push(dqi);
      }
    });

    setDQIs(temp);
  }, [dqi_data]);

  useEffect(() => {
    if (!primary) {
      setHead([
        "Line Item",
        "Purpose",
        "Download Speed (Mbps)",
        "Shared",
        "Quantity",
        "Lines Allocated",
        "Monthly Elig Recurring",
        "Total Elig Non-Recurring",
        "Months of Service",
        "Contract End Date",
      ]);
    }
  }, []);

  useEffect(() => {
    if (scrollSync) app.current.scrollTop = scrollPos;
  }, [scrollPos]);

  useEffect(() => {
    if (!scroll) return;
    app.current.addEventListener("scroll", (element) => {
      scroll(element.target.scrollTop);
    });

    return app.current.removeEventListener("scroll", (element) => {
      scroll(element.target.scrollTop);
    });
  }, []);

  const getYears = () => {
    const start = 2020;
    const end = new Date().getFullYear();

    let years = [];

    for (let i = start; i < end; i++) {
      years.push(i);
    }

    return years.reverse();
  };

  return (
    <div
      ref={app}
      className={`w-full h-full flex-1 overflow-x-hidden overflow-y-auto p-4 rounded-md dark:text-slate-50 ${
        primary && "bg-blue-300/10 border border-blue-500"
      }`}
    >
      <div className="inline-flex flex-row items-center gap-1 mb-6">
        {!primary ? (
          <Dropdown
            title={
              <>
                <h4 className="text-xl font-bold text-left inline-flex flex-row gap-2 items-center justify-center">
                  {currentYear}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </h4>
              </>
            }
          >
            {getYears().map((year, index) => {
              return (
                <button
                  onClick={() => setYear(year)}
                  className="p-2 rounded-md"
                  key={index}
                >
                  {year}
                </button>
              );
            })}
          </Dropdown>
        ) : (
          <h4 className="text-3xl font-bold text-blue-600">{year}</h4>
        )}
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row flex-wrap gap-4">
          <Card className="flex-1 max-w-md min-w-[16rem]">
            <Metrics loading={fetching} data={data} />
          </Card>
          <Card className="flex-1 flex flex-col gap-2 max-w-md min-w-[16rem]">
            <DQI data={dqis} loading={dqi_fetching} />
          </Card>
        </div>
        {!service_fetching ? (
          <>
            <div className="w-full px-4">
              <h3 className={`text-xl font-bold ${primary && "text-blue-600"}`}>
                Services Received
              </h3>
            </div>
            {service.received && service.received.length > 0 ? (
              service.received.map((item, index) => {
                return (
                  <Card key={index} className="min-w-[16rem]">
                    <ul className={metric_styles.container}>
                      <li className={`${metric_styles.item} w-72`}>
                        <p className={metric_styles.label}>FRN</p>
                        <p className={metric_styles.content}>{item.info.frn}</p>
                      </li>
                      <li className={`${metric_styles.item} w-72`}>
                        <p className={metric_styles.label}>Applicant</p>
                        <p className={metric_styles.content}>
                          {item.info.applicant}
                        </p>
                      </li>
                      <li className={`${metric_styles.item} w-72`}>
                        <p className={metric_styles.label}>Service Provider</p>
                        <p className={metric_styles.content}>
                          {item.info.service_provider}
                        </p>
                      </li>
                      <li className="p-2 rounded-md bg-slate-100 dark:text-white dark:bg-slate-900">
                        <Expand>{item.info.narrative}</Expand>
                      </li>
                    </ul>
                    <Table
                      loading={service_fetching}
                      key={index}
                      head={head}
                      body={item.data}
                      search={false}
                      filter={false}
                      sort={false}
                      assignees={false}
                      timestamp={false}
                    />
                  </Card>
                );
              })
            ) : (
              <div className="py-2 px-4 rounded-md text-sm bg-slate-100 dark:text-white dark:bg-slate-800">
                No Services Found
              </div>
            )}
            <div className="w-full px-4">
              <h3 className={`text-xl font-bold ${primary && "text-blue-600"}`}>
                Services Not Received
              </h3>
            </div>
            {service.not_received && service.not_received.length > 0 ? (
              service.not_received.map((item, index) => {
                return (
                  <Card key={index} className="min-w-[16rem]">
                    <ul className={styles.card_content}>
                      <li className={`${styles.item} w-72`}>
                        <p className={styles.label}>FRN</p>
                        <p className={styles.content}>{item.info.frn}</p>
                      </li>
                      <li className={`${styles.item} w-72`}>
                        <p className={styles.label}>Applicant</p>
                        <p className={styles.content}>{item.info.applicant}</p>
                      </li>
                      <li className={`${styles.item} w-72`}>
                        <p className={styles.label}>Service Provider</p>
                        <p className={styles.content}>
                          {item.info.service_provider}
                        </p>
                      </li>
                      <li className="p-2 rounded-md bg-slate-100 dark:text-white dark:bg-slate-800">
                        {item.info.narrative}
                      </li>
                    </ul>
                    <Table
                      loading={service_fetching}
                      key={index}
                      head={head}
                      body={item.data}
                      search={false}
                      filter={false}
                      sort={false}
                      assignees={false}
                      timestamp={false}
                    />
                  </Card>
                );
              })
            ) : (
              <div className="py-2 px-4 rounded-md text-sm bg-slate-100 dark:text-white dark:bg-slate-800">
                No Services Found
              </div>
            )}
          </>
        ) : (
          <Card className="min-w-[16rem]">
            <ul className={metric_styles.container}>
              <li className={`${metric_styles.item} w-72`}>
                <p className={metric_styles.label}>FRN</p>
                <Skeleton />
              </li>
              <li className={`${metric_styles.item} w-72`}>
                <p className={metric_styles.label}>Applicant</p>
                <Skeleton />
              </li>
              <li className={`${metric_styles.item} w-72`}>
                <p className={metric_styles.label}>Service Provider</p>
                <Skeleton />
              </li>
              <li className="p-2 rounded-md bg-slate-100 dark:text-white dark:bg-slate-900">
                <Skeleton />
              </li>
            </ul>
            <Table
              head={head}
              body={[
                {
                  data: [
                    { type: Skeleton },
                    { type: Skeleton },
                    { type: Skeleton },
                    { type: Skeleton },
                    { type: Skeleton },
                    { type: Skeleton },
                    { type: Skeleton },
                    { type: Skeleton },
                    { type: Skeleton },
                    { type: Skeleton },
                  ],
                },
              ]}
              search={false}
              filter={false}
              sort={false}
              assignees={false}
              timestamp={false}
            />
          </Card>
        )}
      </div>
    </div>
  );
};

export default ApplicantView;
