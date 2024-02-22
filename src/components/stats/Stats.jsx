import style from "./Stats.module.css"

export default function Stats() {
  return(
    <div className={style.stats}>
      <h2>Результаты</h2>
      <div>
        <a href="#"><span>Осталось</span><span>18 | 50%</span></a>
        <a href="#"><span>Знаю!</span><span>10 | 26%</span></a>
        <a href="#"><span>Учу!</span><span>8 | 24%</span></a>
      </div>
      <a href="#">Вся статистика</a>
    </div>
  )
}