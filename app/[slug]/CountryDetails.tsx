export type Cprops = {
  data: { [index: string]: string | number };
};

const CountryDetails = ({ data }: Cprops) => {
  return (
    <div className="px-2 flex">
      <table className="mt-3 border border-as-banner">
        <tbody>
          {Object.keys(data).map(
            (datakey: string, i: number) =>
              datakey !== "country" &&
              datakey !== "id" && (
                <tr key={i} className="border-b border-b-as-banner">
                  <th className="text-left bg-as-banner text-as-white px-2 py-1 border-b border-b-as-white">
                    {datakey}
                  </th>
                  <td>{data[datakey]}</td>
                </tr>
              )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CountryDetails;
