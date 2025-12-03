// src/components/icons/icon.tsx

export const SpinnerIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
  >
    <rect width={2.8} height={12} x={1} y={6} fill="currentColor">
      <animate
        id="a1"
        attributeName="y"
        begin="0;a2.end-0.1s"
        calcMode="spline"
        dur="0.6s"
        keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
        values="6;1;6"
      />
      <animate
        attributeName="height"
        begin="0;a2.end-0.1s"
        calcMode="spline"
        dur="0.6s"
        keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
        values="12;22;12"
      />
    </rect>

    <rect width={2.8} height={12} x={5.8} y={6} fill="currentColor">
      <animate
        attributeName="y"
        begin="a1.begin+0.1s"
        calcMode="spline"
        dur="0.6s"
        keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
        values="6;1;6"
      />
      <animate
        attributeName="height"
        begin="a1.begin+0.1s"
        calcMode="spline"
        dur="0.6s"
        keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
        values="12;22;12"
      />
    </rect>

    <rect width={2.8} height={12} x={10.6} y={6} fill="currentColor">
      <animate
        attributeName="y"
        begin="a1.begin+0.2s"
        calcMode="spline"
        dur="0.6s"
        keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
        values="6;1;6"
      />
      <animate
        attributeName="height"
        begin="a1.begin+0.2s"
        calcMode="spline"
        dur="0.6s"
        keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
        values="12;22;12"
      />
    </rect>

    <rect width={2.8} height={12} x={15.4} y={6} fill="currentColor">
      <animate
        attributeName="y"
        begin="a1.begin+0.3s"
        calcMode="spline"
        dur="0.6s"
        keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
        values="6;1;6"
      />
      <animate
        attributeName="height"
        begin="a1.begin+0.3s"
        calcMode="spline"
        dur="0.6s"
        keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
        values="12;22;12"
      />
    </rect>

    <rect width={2.8} height={12} x={20.2} y={6} fill="currentColor">
      <animate
        id="a2"
        attributeName="y"
        begin="a1.begin+0.4s"
        calcMode="spline"
        dur="0.6s"
        keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
        values="6;1;6"
      />
      <animate
        attributeName="height"
        begin="a1.begin+0.4s"
        calcMode="spline"
        dur="0.6s"
        keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
        values="12;22;12"
      />
    </rect>
  </svg>
);

export const GpsPinIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="8rem"
    height="8rem"
    viewBox="0 0 24 24"
  >
    {" "}
    <circle cx={12} cy={9} r={2.5} fill="#ff6900" fillOpacity={0}>
      {" "}
      <animate
        fill="freeze"
        attributeName="fill-opacity"
        begin="0.813s"
        dur="0.188s"
        values="0;1"
      ></animate>{" "}
    </circle>{" "}
    <path
      fill="#ff6900"
      fillOpacity={0}
      stroke="#ff6900"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={0.6}
      d="M12 20.5C12 20.5 11 19 11 18C11 17.5 11.5 17 12 17C12.5 17 13 17.5 13 18C13 19 12 20.5 12 20.5z"
    >
      {" "}
      <animate
        fill="freeze"
        attributeName="d"
        dur="0.5s"
        keyTimes="0;0.7;1"
        values="M12 20.5C12 20.5 11 19 11 18C11 17.5 11.5 17 12 17C12.5 17 13 17.5 13 18C13 19 12 20.5 12 20.5z;M12 20.5C12 20.5 5 13 5 8C5 4.5 8 1 12 1C16 1 19 4.5 19 8C19 13 12 20.5 12 20.5z;M12 20.5C12 20.5 6 13.5 6 9C6 5.68629 8.68629 3 12 3C15.3137 3 18 5.68629 18 9C18 13.5 12 20.5 12 20.5z"
      ></animate>{" "}
      <animate
        fill="freeze"
        attributeName="fill-opacity"
        begin="0.625s"
        dur="0.188s"
        values="0;0"
      ></animate>{" "}
      <animateTransform
        attributeName="transform"
        dur="3.75s"
        keyTimes="0;0.3;0.4;0.54;0.6;0.68;0.7;1"
        repeatCount="indefinite"
        type="rotate"
        values="0 12 20.5;0 12 20.5;-8 12 20.5;0 12 20.5;5 12 20.5;-2 12 20.5;0 12 20.5;0 12 20.5"
      ></animateTransform>{" "}
    </path>{" "}
    <g fill="#ff6900">
      {" "}
      <path d="M12 18c0 0 0 0 0 0c0 0 0 0 0 0l0 0c0 0 0 0 0 0c0 0 0 0 0 0c0 0 0 0 0 0c0 0 0 0 0 0l0 0c0 0 0 0 0 0c0 0 0 0 0 0Z">
        {" "}
        <animate
          fill="freeze"
          attributeName="d"
          begin="1.125s"
          dur="0.25s"
          values="M12 18c0 0 0 0 0 0c0 0 0 0 0 0l0 0c0 0 0 0 0 0c0 0 0 0 0 0c0 0 0 0 0 0c0 0 0 0 0 0l0 0c0 0 0 0 0 0c0 0 0 0 0 0Z;M12 21C15.3 21 18 19.9 18 18.5C18 17.8 17.3 17.2 16.2 16.7L16.8 15.8C18.8 16.6 20 17.7 20 19C20 21.2 16.4 23 12 23C7.6 23 4 21.2 4 19C4 17.7 5.2 16.6 7.1 15.8L7.7 16.7C6.7 17.2 6 17.8 6 18.5C6 19.9 8.7 21 12 21z"
        ></animate>{" "}
      </path>{" "}
    </g>{" "}
  </svg>
);

export const LogoutIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
  >
    <g
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    >
      <path
        strokeDasharray={36}
        strokeDashoffset={36}
        d="M12 4h-7c-0.55 0 -1 0.45 -1 1v14c0 0.55 0.45 1 1 1h7"
      >
        <animate
          fill="freeze"
          attributeName="stroke-dashoffset"
          dur="0.5s"
          values="36;0"
        ></animate>
      </path>
      <path strokeDasharray={14} strokeDashoffset={14} d="M9 12h11.5">
        <animate
          fill="freeze"
          attributeName="stroke-dashoffset"
          begin="0.6s"
          dur="0.2s"
          values="14;0"
        ></animate>
      </path>
      <path
        strokeDasharray={6}
        strokeDashoffset={6}
        d="M20.5 12l-3.5 -3.5M20.5 12l-3.5 3.5"
      >
        <animate
          fill="freeze"
          attributeName="stroke-dashoffset"
          begin="0.8s"
          dur="0.2s"
          values="6;0"
        ></animate>
      </path>
    </g>
  </svg>
);
