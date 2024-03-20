export default function PhrasesAllRow({ data }) {
  return (
    <tr key={data.id} role="row">
      <td role="cell">{data.russian}</td>
      <td role="cell" translate='no' lang="sr-RS" >{data.serbian}</td>
      <td role="cell">{data.correct_count}</td>
      <td role="cell">{data.practiced_count - data.correct_count}</td>
      <td role="cell">{data.practiced_count}</td>
    </tr>
  )
}