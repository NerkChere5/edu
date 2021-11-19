await fetch(
  "https://api-edu.skysmart.ru/api/v1/auth/registration/teacher",
  {
    "method": "POST",
  }
);

await fetch(
  "https://api-edu.skysmart.ru/api/v1/auth/auth",
  {
    "body": "{\"email\":\"r0man.r0man0v.92@yandex.ru\",\"password\":\"s7Bgm5j5wns2iRg\"}",
    "method": "POST",
  }
);

await fetch(
  "https://api-edu.skysmart.ru/api/v1/content/step/load?stepUuid=576fda7b-bbd4-44df-8cd2-c56b7e00c301&studentId=38656800&last=true",
  {
    "headers": {
      "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2MzcxNDQ4ODYsImV4cCI6MTYzOTczNjg4Niwicm9sZXMiOlsiUk9MRV9FRFVfU0tZU01BUlRfVEVBQ0hFUl9VU0FHRSJdLCJ1c2VySWQiOjM4NjU2ODAwLCJlbWFpbCI6bnVsbCwibmFtZSI6bnVsbCwic3VybmFtZSI6bnVsbCwiaWRlbnRpdHkiOiJydWRlemVmdXNlIn0.bXgLQCvVHE-rojN7Hxn14SgHCUUTPBWWdX9ZZVnOPm5dly2NNx-W6QGGmPie44s0UH_6UDQqnecRFfn_1_3zyDMpvcP59T-dKabWtLvVmiqYNTGBK8AB9vp3PLM0nXvHRvOLj4Kn__m68rHQk4aGpZW2w_JnLJIYhnMoRdUQI_nad1BUU2pU2_oRFY0frwLS3ydXDTcC8wKhPN0sns_y57mJHk4lZ_RIwi5dqztLKYmb0P0s2tpYEOJNK7gBN0CKn0jtBA48JziQzBx2TuhGR3FmAoG9vd6wjCKqWhY5Fh-xXhQqgRXVlonaAsJDgM8RzZnNB3GBqUhfZjR1QDL0i0lSTqdqLFIURSrfn48Zckydr6Kn1Gn9SaFbBlm9E-MeAdj9mkL1HFzFCl5u_BdtJJM7GLhavdkbwmDpjr2u-_4bN0lLI4otiMqvjST-aL67DKyzjtloQLqDey_gw56C-Bi0VH8QTZdb5Gj_y2HHry6noB2U-CTfYxRRRf_yGNaUW3Z7XrZescrkekDxZckVkHvkZCs6Qp8ttaMphBMRYxVpSm3trG7xJil1YfUUQj2BvY9iRUlP7Srvw9SQx01Zfme-PgV8-_mHJRFY5e_RO6ZELN49b943C540qZttWLc77F7qqJOz38JRUULVLme0_GGvSKHPbSBX3GnA9ebw9GQ",
    },
  }
);

await fetch(
  "https://api-edu.skysmart.ru/api/v1/lesson/join", {
    "headers": {
        "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2MzcxNTYzMDUsImV4cCI6MTYzOTc0ODMwNSwicm9sZXMiOlsiUk9MRV9FRFVfU0tZU01BUlRfU1RVREVOVF9VU0FHRSJdLCJ1c2VySWQiOjM3MzQwMzU1LCJlbWFpbCI6Implbm5pZmVyNDFAbWFpbC5ydSIsIm5hbWUiOiLQnNCw0LrRgdC40LwiLCJzdXJuYW1lIjoi0KHQtdGA0LPQtdC10LIiLCJpZGVudGl0eSI6ImJlcmVsdXJvbWEifQ.Xjt_QC5o266EWolq_kaYBWW2OJEsuBP2aqQYiuUb1E6-o8OkqYP6eLX37caie8txalSQqOLStP2pEisU9hiIiwMAb4IA9M27npl8eLyuTOM18DCTFdYvogUrIrNmUNPL-7LfW621Z0eSVfUNE3ugdwiCB_3tt61DrbVHymGh3LgFcyDSmvViAZm-meE9Y86f-pJDoJOsuFsm4bqgl-RFWa0vjrXyKem2OF1P-Im5TyK8eq2fV68gF3jS6YZWv4cFMUJzlhQHMHdfqp8LBK7ncOli4DrCT4LxpmWOWVbVqmAIC_lNiQci9GkYrAkRzYAfYggvr-8iza_ev0s3mTFVwT-3aUtO6B7lAQUr5hqpp0O2EmbECKZtA0jaRqqVXQuqcyZPV8FGQgy5KPUl9P7UDjHGsw8lXlf7o9gzDsS-erNJlnjwE1q3nkR91yOPyi69MH-RRkN5UYM_wcNmXk2FH2uLp8Smd-BJ3NGKJtGRuwuc_igT8ukv-X4pPC66I9XHgSIKdu_s4KU6yDNoFC75_ABArNSApvHoNtTs5wyY_MB4c9UTNNzfYm0RaTm7pCKECJIy5zL2mKSc67TTukK3-xgcM6xgpMyHu6B2Bk20tA75P0FF-adHJ4usNyjVqzG3Y3SB5AlqXpopnKw3DimK9t5YbluLPIc06qVHGtaeBz8",
    },
    "body": "{\"roomHash\":\"nemuvobenaxa\"}",
    "method": "POST",
  }
);

await fetch(
  "https://api-edu.skysmart.ru/api/v1/user/progress/save",
  {
    "headers": {
        "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2MzcxNTYzMDUsImV4cCI6MTYzOTc0ODMwNSwicm9sZXMiOlsiUk9MRV9FRFVfU0tZU01BUlRfU1RVREVOVF9VU0FHRSJdLCJ1c2VySWQiOjM3MzQwMzU1LCJlbWFpbCI6Implbm5pZmVyNDFAbWFpbC5ydSIsIm5hbWUiOiLQnNCw0LrRgdC40LwiLCJzdXJuYW1lIjoi0KHQtdGA0LPQtdC10LIiLCJpZGVudGl0eSI6ImJlcmVsdXJvbWEifQ.Xjt_QC5o266EWolq_kaYBWW2OJEsuBP2aqQYiuUb1E6-o8OkqYP6eLX37caie8txalSQqOLStP2pEisU9hiIiwMAb4IA9M27npl8eLyuTOM18DCTFdYvogUrIrNmUNPL-7LfW621Z0eSVfUNE3ugdwiCB_3tt61DrbVHymGh3LgFcyDSmvViAZm-meE9Y86f-pJDoJOsuFsm4bqgl-RFWa0vjrXyKem2OF1P-Im5TyK8eq2fV68gF3jS6YZWv4cFMUJzlhQHMHdfqp8LBK7ncOli4DrCT4LxpmWOWVbVqmAIC_lNiQci9GkYrAkRzYAfYggvr-8iza_ev0s3mTFVwT-3aUtO6B7lAQUr5hqpp0O2EmbECKZtA0jaRqqVXQuqcyZPV8FGQgy5KPUl9P7UDjHGsw8lXlf7o9gzDsS-erNJlnjwE1q3nkR91yOPyi69MH-RRkN5UYM_wcNmXk2FH2uLp8Smd-BJ3NGKJtGRuwuc_igT8ukv-X4pPC66I9XHgSIKdu_s4KU6yDNoFC75_ABArNSApvHoNtTs5wyY_MB4c9UTNNzfYm0RaTm7pCKECJIy5zL2mKSc67TTukK3-xgcM6xgpMyHu6B2Bk20tA75P0FF-adHJ4usNyjVqzG3Y3SB5AlqXpopnKw3DimK9t5YbluLPIc06qVHGtaeBz8",
    },
    "body": "{\"progressType\":\"step\",\"progressId\":\"8130e60e-53ad-432e-bd55-a8c52f6f929f\",\"userId\":37340355,\"score\":50,\"completeness\":66,\"roomHash\":\"nemuvobenaxa\",\"skippedAt\":null}",
    "method": "POST",
  }
);
