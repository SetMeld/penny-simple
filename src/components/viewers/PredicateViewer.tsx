import {
  asUrl,
  FetchError,
  getBooleanAll,
  getDatetimeAll,
  getDecimalAll,
  getIntegerAll,
  getSourceUrl,
  getStringByLocaleAll,
  getStringNoLocaleAll,
  getTermAll,
  getUrlAll,
  isContainer,
  removeBoolean,
  removeDatetime,
  removeDecimal,
  removeInteger,
  removeLiteral,
  removeStringNoLocale,
  removeStringWithLocale,
  removeUrl,
  setThing,
  ThingPersisted,
  UrlString,
} from "@inrupt/solid-client";
import React, { FC } from "react";
import { MdContentCopy, MdLink, MdTextFields } from "react-icons/md";
import {
  VscCalendar,
  VscPrimitiveSquare,
  VscQuestion,
  VscSymbolBoolean,
  VscTrash,
} from "react-icons/vsc";
import { toast } from "react-toastify";
import { Url } from "../data/Url";
import { ObjectAdder } from "../adders/ObjectAdder";
import { ObjectViewer } from "./ObjectViewer";
import { PredicateUrl } from "./PredicateUrl";
import { ClientLocalized } from "../ClientLocalized";
import { LoadedCachedDataset } from "../../hooks/dataset";
import { HasAccess } from "../HasAccess";
import { hasAccess } from "../../functions/hasAccess";
import { ldp } from "rdf-namespaces";
import { useL10n } from "../../hooks/l10n";

interface Props {
  dataset: LoadedCachedDataset;
  thing: ThingPersisted;
  predicate: UrlString;
  onUpdate: (previousThing: ThingPersisted) => void;
}

export const PredicateViewer: FC<Props> = (props) => {
  const l10n = useL10n();
  const urlValues = getUrlAll(props.thing, props.predicate);
  const stringNoLocaleValues = getStringNoLocaleAll(
    props.thing,
    props.predicate,
  );
  const integerValues = getIntegerAll(props.thing, props.predicate);
  const decimalValues = getDecimalAll(props.thing, props.predicate);
  const datetimeValues = getDatetimeAll(props.thing, props.predicate);
  const booleanValues = getBooleanAll(props.thing, props.predicate);
  const allValues = getTermAll(props.thing, props.predicate);
  const stringsByLocale = getStringByLocaleAll(props.thing, props.predicate);

  // Get the locale strings in the format I wish they were in in the first place,
  // i.e. Array<[locale: string, value: string]>:
  const localeStringValues = Array.from(stringsByLocale.entries())
    .map(([locale, stringValues]) => {
      return stringValues.map((stringValue) => [locale, stringValue]);
    })
    .flat();

  const dataOfUnkownType = allValues.find((term) => {
    return term.termType !== "Literal" && term.termType !== "NamedNode";
  });
  const unknownObject = dataOfUnkownType ? (
    <li className="pl-0">
      <ObjectViewer type={<VscQuestion />}>
        {l10n.getString("object-unknown")}
      </ObjectViewer>
    </li>
  ) : null;
  const dataOfUnsupportedType = allValues.filter((term) => {
    return (
      term.termType === "Literal" &&
      ![
        "http://www.w3.org/2001/XMLSchema#boolean",
        "http://www.w3.org/2001/XMLSchema#dateTime",
        "http://www.w3.org/2001/XMLSchema#decimal",
        "http://www.w3.org/2001/XMLSchema#integer",
        "http://www.w3.org/2001/XMLSchema#string",
        "http://www.w3.org/1999/02/22-rdf-syntax-ns#langString",
      ].includes(term.datatype.value)
    );
  });
  const unsupportedTypes = dataOfUnsupportedType.map((data) => (
    <li className="pl-0" key={data.value}>
      <ObjectViewer
        type={<VscPrimitiveSquare />}
        options={[
          {
            element: (
              <ClientLocalized
                id="object-delete-button-unknown"
                vars={{
                  value: data.value,
                  type: (data as any).datatype.value,
                }}
              >
                <VscTrash
                  title={`Delete value "${data.value}" of unknown type "${
                    (data as any).datatype.value
                  }"`}
                  aria-label={`Delete value "${data.value}" of unknown type "${
                    (data as any).datatype.value
                  }"`}
                />
              </ClientLocalized>
            ),
            callback: () => deleteUnsupportedType(data),
            when: hasAccess(props.dataset.data, ["write"]),
          },
        ]}
      >
        <samp
          title={l10n.getString("object-unknown-tooltip", {
            type: (data as any).datatype.value,
          })}
        >
          {data.value}
        </samp>
      </ObjectViewer>
    </li>
  ));

  const updateThing = async (updatedThing: ThingPersisted) => {
    const updatedDataset = setThing(props.dataset.data, updatedThing);
    try {
      await props.dataset.save(updatedDataset);
      props.onUpdate(props.thing);
    } catch (e) {
      if (e instanceof FetchError && e.statusCode === 403) {
        toast(l10n.getString("thing-toast-error-not-allowed"), {
          type: "error",
        });
      } else {
        throw e;
      }
    }
  };

  const copyToClipboard = async (value: string) => {
    await navigator.clipboard.writeText(value);
    toast(l10n.getString("object-copy-toast-success-url"), { type: "info" });
  };
  const deleteUrl = (url: UrlString) =>
    updateThing(removeUrl(props.thing, props.predicate, url));
  const deleteStringNoLocale = (string: string) =>
    updateThing(removeStringNoLocale(props.thing, props.predicate, string));
  const deleteStringWithLocale = (string: string, locale: string) =>
    updateThing(
      removeStringWithLocale(props.thing, props.predicate, string, locale),
    );
  const deleteInteger = (integer: number) =>
    updateThing(removeInteger(props.thing, props.predicate, integer));
  const deleteDecimal = (decimal: number) =>
    updateThing(removeDecimal(props.thing, props.predicate, decimal));
  const deleteDatetime = (datetime: Date) =>
    updateThing(removeDatetime(props.thing, props.predicate, datetime));
  const deleteBoolean = (boolean: boolean) =>
    updateThing(removeBoolean(props.thing, props.predicate, boolean));
  const deleteUnsupportedType = (value: unknown) =>
    updateThing(removeLiteral(props.thing, props.predicate, value as any));

  return (
    <dl>
      <dt>
        <PredicateUrl url={props.predicate} />
      </dt>
      <dd>
        <ul>
          {urlValues.sort().map((value) => (
            <li key={value + "_urlObject"} className="pl-0">
              <ObjectViewer
                type={<MdLink />}
                options={[
                  {
                    element: (
                      <ClientLocalized
                        id="object-copy-button-url"
                        attrs={{ title: true, "aria-label": true }}
                        vars={{ value: value }}
                      >
                        <MdContentCopy
                          title={`Copy "${value}"`}
                          aria-label={`Copy "${value}"`}
                        />
                      </ClientLocalized>
                    ),
                    callback: () => copyToClipboard(value),
                  },
                  {
                    element: (
                      <ClientLocalized
                        id="object-delete-button-url"
                        attrs={{ title: true, "aria-label": true }}
                        vars={{ value: value }}
                      >
                        <VscTrash
                          title={`Delete "${value}"`}
                          aria-label={`Delete "${value}"`}
                        />
                      </ClientLocalized>
                    ),
                    callback: () => deleteUrl(value),
                    when:
                      hasAccess(props.dataset.data, ["write"]) &&
                      // Don't show the deletion button for `ldp:contains`
                      // statements; they can't be removed except by removing
                      // the referenced Resource:
                      !(
                        isContainer(props.dataset.data) &&
                        props.predicate === ldp.contains
                      ),
                  },
                ]}
              >
                <Url url={value} sourceUrl={getSourceUrl(props.dataset.data)} />
              </ObjectViewer>
            </li>
          ))}

          {stringNoLocaleValues.sort().map((value) => (
            <li key={value + "_stringNoLocaleObject"} className="pl-0">
              <ObjectViewer
                type={<MdTextFields />}
                options={[
                  {
                    element: (
                      <ClientLocalized
                        id="object-delete-button-string"
                        attrs={{ title: true, "aria-label": true }}
                        vars={{ value: value }}
                      >
                        <VscTrash
                          title={`Delete "${value}"`}
                          aria-label={`Delete "${value}"`}
                        />
                      </ClientLocalized>
                    ),
                    callback: () => deleteStringNoLocale(value),
                    when: hasAccess(props.dataset.data, ["write"]),
                  },
                ]}
              >
                {value}
              </ObjectViewer>
            </li>
          ))}

          {localeStringValues.sort().map(([locale, value]) => (
            <li key={value + "_stringNoLocaleObject"} className="pl-0">
              <ObjectViewer
                type={<MdTextFields />}
                options={[
                  {
                    element: (
                      <ClientLocalized
                        id="object-delete-button-string-locale"
                        attrs={{ title: true, "aria-label": true }}
                        vars={{ value: value, locale: locale }}
                      >
                        <VscTrash
                          title={`Delete "${value} (${locale})"`}
                          aria-label={`Delete "${value} (${locale})"`}
                        />
                      </ClientLocalized>
                    ),
                    callback: () => deleteStringWithLocale(value, locale),
                    when: hasAccess(props.dataset.data, ["write"]),
                  },
                ]}
              >
                {value} <span className="text-gray-500">({locale})</span>
              </ObjectViewer>
            </li>
          ))}

          {integerValues.sort().map((value) => (
            <li key={value + "_integerObject"} className="pl-0">
              <ObjectViewer
                type={<>1</>}
                options={[
                  {
                    element: (
                      <ClientLocalized
                        id="object-delete-button-integer"
                        attrs={{ title: true, "aria-label": true }}
                        vars={{ value: value }}
                      >
                        <VscTrash
                          title={`Delete "${value}"`}
                          aria-label={`Delete "${value}"`}
                        />
                      </ClientLocalized>
                    ),
                    callback: () => deleteInteger(value),
                    when: hasAccess(props.dataset.data, ["write"]),
                  },
                ]}
              >
                {value}
              </ObjectViewer>
            </li>
          ))}

          {decimalValues.sort().map((value) => (
            <li key={value + "_decimalObject"} className="pl-0">
              <ObjectViewer
                type={<>1.0</>}
                options={[
                  {
                    element: (
                      <ClientLocalized
                        id="object-delete-button-decimal"
                        attrs={{ title: true, "aria-label": true }}
                        vars={{ value: value }}
                      >
                        <VscTrash
                          title={`Delete "${value}"`}
                          aria-label={`Delete "${value}"`}
                        />
                      </ClientLocalized>
                    ),
                    callback: () => deleteDecimal(value),
                    when: hasAccess(props.dataset.data, ["write"]),
                  },
                ]}
              >
                {Number.isInteger(value) ? value.toFixed(1) : value.toString()}
              </ObjectViewer>
            </li>
          ))}

          {datetimeValues
            .sort((a, b) => a.getTime() - b.getTime())
            .map((value) => {
              if (isNaN(value.getTime())) {
                const datetimes = getTermAll(
                  props.thing,
                  props.predicate,
                ).filter(
                  (term) =>
                    term.termType === "Literal" &&
                    term.datatype.value ===
                      "http://www.w3.org/2001/XMLSchema#dateTime",
                );
                if (datetimes.length === 1) {
                  // If there's just one value of type dateTime, it must be the current one,
                  // so we can display the invalid value:
                  return (
                    <li
                      key={`${asUrl(props.thing)}-${
                        props.predicate
                      }-invalid-datetime-${datetimes[0].value}`}
                      className="pl-0"
                    >
                      <ObjectViewer type={<VscQuestion />}>
                        {l10n.getString("object-invalid-date-known", {
                          date: datetimes[0].value,
                        })}
                      </ObjectViewer>
                    </li>
                  );
                }
                return (
                  <li
                    key={`${asUrl(props.thing)}-${
                      props.predicate
                    }-object-invalid-date`}
                    className="pl-0"
                  >
                    <ObjectViewer type={<VscQuestion />}>
                      {l10n.getString("object-invalid-date")}
                    </ObjectViewer>
                  </li>
                );
              }
              return (
                <li
                  key={value.toISOString() + "_datetimeObject"}
                  className="pl-0"
                >
                  <ObjectViewer
                    type={
                      <>
                        <VscCalendar />
                      </>
                    }
                    options={[
                      {
                        element: (
                          <ClientLocalized
                            id="object-delete-button-datetime"
                            attrs={{ title: true, "aria-label": true }}
                            vars={{ value: value.toLocaleString() }}
                          >
                            <VscTrash
                              title={`Delete "${value.toLocaleString()}"`}
                              aria-label={`Delete "${value.toLocaleString()}"`}
                            />
                          </ClientLocalized>
                        ),
                        callback: () => deleteDatetime(value),
                        when: hasAccess(props.dataset.data, ["write"]),
                      },
                    ]}
                  >
                    <time
                      title={value.toISOString()}
                      dateTime={value.toISOString()}
                    >
                      {value.toLocaleString()}
                    </time>
                  </ObjectViewer>
                </li>
              );
            })}

          {booleanValues.map((value) => (
            <li key={value.toString() + "_booleanObject"} className="pl-0">
              <ObjectViewer
                type={
                  <>
                    <VscSymbolBoolean />
                  </>
                }
                options={[
                  {
                    element: (
                      <ClientLocalized
                        id="object-delete-button-boolean"
                        attrs={{ title: true, "aria-label": true }}
                        vars={{ value: value.toString() }}
                      >
                        <VscTrash
                          title={`Delete "${value}"`}
                          aria-label={`Delete "${value}"`}
                        />
                      </ClientLocalized>
                    ),
                    callback: () => deleteBoolean(value),
                    when: hasAccess(props.dataset.data, ["write"]),
                  },
                ]}
              >
                {value.toString()}
              </ObjectViewer>
            </li>
          ))}

          {unsupportedTypes}
          {unknownObject}

          <HasAccess access={["append"]} resource={props.dataset.data}>
            <ObjectAdder {...props} />
          </HasAccess>
        </ul>
      </dd>
    </dl>
  );
};
