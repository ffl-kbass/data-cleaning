import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "urql";
import { SelectedContext } from "../../../Context/context";
import ApplicantView from "../../../components/Applicant";
import Title from "../../../components/Title";
import styles from "./Applicant.module.css";
import Edit from "../../../components/Edit";
import Button from "../../../components/Button";

const Applicant = () => {
  const router = useRouter();
  const [scroll, setScroll] = useState(0);
  const [toggle, setToggle] = useState(false);
  const [selected, setSelected] = useState([]);
  const [ent_num, setEntity_number] = useState(0);
  const [POS, setPOS] = useState(null);

  useEffect(() => {
    if (router.query.district) {
      setEntity_number(router.query.district);
    }
  }, [router]);

  const [result] = useQuery({
    query: `
			query(
				$funding_year: Int,
				$entity_number: Int!,
			) {
			district (
					funding_year: $funding_year,
					entity_number: $entity_number,
				) {
					items {
						entity_name
					}
				}
			}
		`,
    variables: {
      funding_year: 2022,
      entity_number: Number(ent_num),
    },
  });

  const { data, fetching, error } = result;

  const dispatchSelectedEvent = (payload) => {
    if (payload.target.checked) {
      if (!selected.includes(payload.target.value)) {
        setSelected((prev) => [...prev, payload.target.value]);
      }
    } else {
      setSelected(
        selected.filter((element) => element != payload.target.value)
      );
    }
  };

  return (
    <SelectedContext.Provider value={{ selected, dispatchSelectedEvent }}>
      <div className="w-full flex items-center justify-center">
        <Edit />
      </div>
      <div className="flex flex-col h-full w-full overflow-hidden">
        <Title>
          {data ? data.district.items.entity_name : "Finding Client..."}
        </Title>
        <div className={styles.container}>
          {router.query.district && (
            <>
              <ApplicantView
                entity_number={router.query.district[0]}
                primary={true}
                year={2022}
                scrollSync={toggle}
                scroll={setScroll}
                scrollPos={scroll}
              />
              <ApplicantView
                entity_number={router.query.district[0]}
                year={
                  router.query.district && router.query.district[1]
                    ? router.query.district[1]
                    : new Date().getFullYear() - 1
                }
                scrollSync={toggle}
                scrollPos={scroll}
              />
            </>
          )}
        </div>
        <div className="w-full pt-2">
          <Button onClick={() => setToggle(!toggle)}>
            {toggle ? "Disable Scroll Sync" : "Enable Scroll Sync"}
          </Button>
        </div>
      </div>
    </SelectedContext.Provider>
  );
};

export default Applicant;
