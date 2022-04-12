import './brSpinner.scss';
declare type Ty2217 = {
    /**
     * триггер показа текущего компонента
     */
    show?: boolean;
    /**
     * цвет заполнителя
     */
    bgColor?: string;
    /**
     * если TRUE то закрывается весь экран, иначе закрывается ближайший [aszm]-радитель
     */
    fullscreen?: boolean;
    /**
     * тут можно подставить свои CSS проперти для контейнера если нужно
     */
    css?: object;
};
export default function BrSpinner({ show, bgColor, fullscreen, css }: Ty2217): JSX.Element;
export {};
