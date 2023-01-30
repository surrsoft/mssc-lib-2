/**
 * Берёт текущее время, сравнивает его с {@param timeStartMsc} и инициирует паузу до тех пор пока текущее
 * время не будет равно {@param timeStartMsc} + {@param minDurationMsc}. Если время получается отрицательным, то ничего
 * не делает. Какие бы ни были входные параметры, не делает задержку длиннее 10 секунд
 *
 * Если простыми словами - текущая функция полезна, если нужно чтобы код гарантированно выполнялся не быстрее
 * чем за {@param minDurationMsc}, для создания для пользователя более привычного UX при котором операция не
 * выполняется совсем уж мгновенно
 *
 * ID [[221102201355]] rev 1 1.0.0 2022-11-02
 *
 * @param minDurationMsc минимальная продолжительность, в милисекундах; если отрицательное число, принудительно
 * используется 0
 * @param timeStartMsc время начала, unixtime miliseconds
 */
export async function hxhgWaitMin(minDurationMsc: number, timeStartMsc: number) {
  let minDurationMscNext = minDurationMsc;
  if (minDurationMsc < 0) minDurationMscNext = 0;
  const timeDiff = minDurationMscNext - (Date.now() - timeStartMsc);
  let duration = timeDiff > 0 ? timeDiff : 0;
  if (duration > 10000) duration = 10000;

  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, duration);
  });
}
