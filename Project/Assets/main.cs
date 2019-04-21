using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class main : MonoBehaviour
{
    int SelectIndex = 0;
    public UnityEngine.UI.Text mainText;
    public UnityEngine.UI.Text InputText;
    public UnityEngine.UI.Text AIText;
    public UnityEngine.UI.Image PlayerImage;
    public UnityEngine.UI.Image EnemyImage;

    const int S = 0;
    const int R = 1;
    const int P = 2;
    string IndexToMsg(int index)
    {
        if (index == S)
            return "가위";
        else if (index == R)
            return "바위";
        else
            return "보";
    }

    Sprite IndexToSprite(int index) //해당하는 이미지를 넣어주기 위함
    {
        if (index == S)
            return SImage;
        else if (index == R)
            return RImage;
        else
            return PImage;
    }

    public Sprite SImage;
    public Sprite RImage;
    public Sprite PImage;

    public void myonClick(int index)
    {

        SelectIndex = index;
        InputText.text = IndexToMsg(SelectIndex);

        int AiSelectIndex= Random.Range(0, 3);
        AIText.text = IndexToMsg(AiSelectIndex);

        PlayerImage.sprite = IndexToSprite(index);
        EnemyImage.sprite = IndexToSprite(AiSelectIndex);


        if (SelectIndex == AiSelectIndex)
        {
            mainText.text = "무승부";
        }
        else if (SelectIndex == S && AiSelectIndex == P ||
                   SelectIndex == R && AiSelectIndex == S ||
                   SelectIndex == P && AiSelectIndex == R)
            mainText.text = "승";
        else
            mainText.text = "패";
    }
   
    // Start is called before the first frame update
    void Start()
    {
        mainText.text = "게임시작";
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
