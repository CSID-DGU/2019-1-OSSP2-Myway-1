using NCMB;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class DataSave : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        SavePlayerData("AAA", 100, 300);
    }
    public void SavePlayerData(string playerName, int score, int coin)
    {
        NCMBObject obj = new NCMBObject("PlayerData");
        obj.Add("PlayerName", playerName);
        obj.Add("Score", score);
        obj.Add("Coin", coin);
        NCMBCallback callback = DoAfterSave;
        obj.SaveAsync(callback);
    }
    void DoAfterSave(NCMBException e)
    {       if (e != null)
            {
                Debug.Log("저장실패. 통신환경을 확인하십시오.");
            }
            else
            {
                Debug.Log("저장 성공!");
            }
    }
}
