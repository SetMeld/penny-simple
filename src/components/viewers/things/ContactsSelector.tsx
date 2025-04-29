import { label, op } from "rdf-namespaces/dist/fhir";
import { ChangeEvent, FC, useMemo } from "react";

interface Props {
  value: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export const ContactsSelector: FC<Props> = (props) => {
  const sharingWebIds = useMemo(
    () => [
      "https://jackson.solidcommunity.net/profile/card#me",
      "https://paolos.datapod.igrant.io/profile/card#me",
    ],
    [],
  );

  const options = useMemo(() => {
    return [
      { value: "", label: "Select an entity to share to" },
      ...sharingWebIds.map((webId) => ({ value: webId, label: webId })),
    ];
  }, [sharingWebIds]);

  return (
    <select
      name="webId"
      id="webId"
      className="flex-grow rounded bg-white p-2 focus:outline-none focus:ring-2 focus:ring-gray-700"
      value={props.value}
      onChange={props.onChange}
    >
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
